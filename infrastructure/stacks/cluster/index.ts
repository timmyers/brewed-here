import K8sMetricsServer from '@timmyers/pulumi-k8s-metrics-server';
import * as fs from 'fs';
import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';
import * as doc from '@pulumi/digitalocean';
import API from './api';

export default async (): Promise<void> => {
  const cluster = new doc.KubernetesCluster('do1', {
    region: 'sfo2',
    version: '1.16.2-do.0',
    nodePool: {
      name: 'pool1',
      size: 's-1vcpu-2gb',
      autoScale: true,
      minNodes: 1,
      maxNodes: 3,
    },
  });

  // const certificate = new doc.Certificate('brewed-here', {
  //   name: 'brewed-here',
  //   domains: [
  //     'traefik.brewedhere.co',
  //   ],
  //   type: doc.CertificateTypes.LetsEncrypt,
  // });

  const certificate2 = new doc.Certificate('brewed-here2', {
    name: 'brewed-here2',
    domains: [
      'api.brewedhere.co',
    ],
    type: doc.CertificateTypes.LetsEncrypt,
  });

  const k8sProvider = new k8s.Provider('k8s', {
    kubeconfig: cluster.kubeConfigs[0].rawConfig,
  });

  const defaultOpts = { providers: { kubernetes: k8sProvider } };
  const defaultComponentOpts = { provider: k8sProvider };

  const metricsServer = new K8sMetricsServer('metrics-server', {
    command: [
      '/metrics-server',
      '--logtostderr',
      '--kubelet-preferred-address-types=InternalIP',
      '--cert-dir=/tmp',
      '--kubelet-insecure-tls',
      '--secure-port=8443',
    ],
  }, defaultOpts);

  // const linkerd = new k8s.helm.v2.Chart('linkerd', {
  //   repo: 'linkerd',
  //   chart: 'linkerd2',
  //   version: '2.6.0',
  //   values: {
  //     Identity: {
  //       TrustAnchorsPEM: fs.readFileSync('./linkerd-certs/ca.crt').toString('utf8'),
  //       Issuer: {
  //         TLS: {
  //           CrtPEM: fs.readFileSync('./linkerd-certs/issuer.crt').toString('utf8'),
  //           KeyPEM: fs.readFileSync('./linkerd-certs/issuer.key').toString('utf8'),
  //         },
  //         CrtExpiry: '2020-12-04T11:48:54Z'
  //       },
  //     },
  //   },
  //   transformations: [(y: any, opts: pulumi.CustomResourceOptions): void => {
  //     if (y.kind === 'Secret' || y.kind === 'ConfigMap') {
  //       opts.ignoreChanges = ['data']
  //     }
  //     if (y.kind === 'MutatingWebhookConfiguration' || y.kind === 'ValidatingWebhookConfiguration') {
  //       opts.ignoreChanges = ['webhooks[0].clientConfig.caBundle']
  //     }
  //     if (y.kind === 'APIService') {
  //       opts.ignoreChanges = ['spec.caBundle']
  //     }
  //   }],
  // }, defaultOpts);
  
  const nginxNamespace = new k8s.core.v1.Namespace('nginx', {
    metadata: { 
      name: 'nginx',
      // annotations: {
      //   'linkerd.io/inject': 'enabled',
      // },
    },
  }, defaultComponentOpts);


  const nginx = new k8s.helm.v2.Chart('nginx', {
    repo: 'stable',
    chart: 'nginx-ingress',
    version: '1.26.2',
    namespace: nginxNamespace.metadata.name,
    values: {
      controller: {
        publishService: { enabled: true },
        service: {
          targetPorts: {
            https: 80,
          },
          annotations: {
            'service.beta.kubernetes.io/do-loadbalancer-protocol': 'https',
            'service.beta.kubernetes.io/do-loadbalancer-redirect-http-to-https': 'true',
            'service.beta.kubernetes.io/do-loadbalancer-certificate-id': certificate2.id,
          },
        },
        autoscaling: {
          enabled: true,
          minReplicas: 2,
        },
        minAvailable: 1,
      },
      defaultBackend: {
        resources: {
          limits: {
            cpu: '50m',
            memory: '50Mi',
          },
          requests: {
            cpu: '10m',
            memory: '10Mi',
          },
          replicaCount: 2,
          minAvailable: 1,
        },
      },
    },
    transformations: [(y) => {
      y.metadata.namespace = nginxNamespace.metadata.name; // eslint-disable-line
    }],
  }, defaultOpts);

  // const traefikNamespace = new k8s.core.v1.Namespace('traefik', {
  //   metadata: { 
  //     name: 'traefik',
  //     // annotations: {
  //     //   'linkerd.io/inject': 'enabled',
  //     // },
  //   },
  // }, defaultComponentOpts);

  // const traefikDashboardAuthSecret = new k8s.core.v1.Secret('traefik-dashboard-auth', {
  //   metadata: {
  //     name: 'authsecret',
  //     namespace: traefikNamespace.metadata.name,
  //   },
  //   type: 'Opaque',
  //   stringData: {
  //     users: 'brewedhere:$apr1$HkFfbu2E$uzgittuYAx51CpupwL4Rv0',
  //   },
  // }, defaultComponentOpts);


  // const traefik = new k8s.helm.v2.Chart('traefik', {
  //   repo: 'stable',
  //   chart: 'traefik',
  //   version: '1.82.3',
  //   namespace: traefikNamespace.metadata.name,
  //   values: {
  //     rbac: {
  //       enabled: true,
  //     },
  //     service: {
  //       annotations: {
  //         'service.beta.kubernetes.io/do-loadbalancer-protocol': 'https',
  //         'service.beta.kubernetes.io/do-loadbalancer-redirect-http-to-https': 'true',
  //         'service.beta.kubernetes.io/do-loadbalancer-certificate-id': certificate.id,
  //       },
  //     },
  //     ssl: {
  //       enabled: false,
  //       // enabled: true,
  //       // enforced: true,
  //     },
  //     acme: {
  //       enabled: false,
  //       // enabled: true,
  //       staging: true,
  //       logging: true,
  //       email: 'timmyers09@gmail.com',
  //       challengeType: 'tls-alpn-01',
  //       persistence: {
  //         storageClass: 'do-block-storage',
  //       },
  //       domains: {
  //         enabled: true,
  //         domainsList: [{
  //           main: 'traefik.brewedhere.co',
  //         }],
  //       },
  //     },
  //     dashboard: {
  //       enabled: true,
  //       domain: 'traefik.brewedhere.co',
  //       ingress: {
  //         annotations: {
  //           'kubernetes.io/ingress.class': 'traefik',
  //           'external-dns.alpha.kubernetes.io/ttl': '60',
  //           'traefik.ingress.kubernetes.io/auth-type': 'basic',
  //           'traefik.ingress.kubernetes.io/auth-secret': traefikDashboardAuthSecret.metadata.name,
  //         },
  //       },
  //     },
  //     kubernetes: {
  //       ingressEndpoint: {
  //         useDefaultPublishedService: true,
  //       },
  //     },
  //   },
  //   transformations: [(y: any, opts: pulumi.CustomResourceOptions): void => {
  //     if (y.metadata !== undefined) {
  //       y.metadata.namespace = traefikNamespace.metadata.name; // eslint-disable-line
  //     }
  //     if (y.apiVersion === 'extensions/v1beta1' && y.kind == 'Ingress') {
  //       y.apiVersion = 'networking.k8s.io/v1beta1';
  //     }
  //     // if (y.kind === 'ConfigMap') {
  //     //   // Staging => prod hack
  //     //   y.data['traefik.toml'] = y.data['traefik.toml'].replace('https://acme-staging-v02.api.letsencrypt.org/directory', 'https://acme-v02.api.letsencrypt.org/directory')
  //     // }
  //   }],
  // }, defaultComponentOpts);


  const externalDnsNamespace = new k8s.core.v1.Namespace('external-dns', {
    metadata: { name: 'external-dns' },
  }, defaultComponentOpts);

  const externalDns = new k8s.helm.v2.Chart('external-dns', {
    repo: 'stable',
    chart: 'external-dns',
    version: '2.12.0',
    namespace: externalDnsNamespace.metadata.name,
    values: {
      provider: 'digitalocean',
      policy: 'sync',
      digitalocean: {
        apiToken: process.env.DIGITALOCEAN_TOKEN,
      },
    },
    transformations: [(y: any, opts: pulumi.CustomResourceOptions): void => {
      if (y.metadata !== undefined) {
        y.metadata.namespace = externalDnsNamespace.metadata.name; // eslint-disable-line
      }
    }],
  }, defaultComponentOpts);

  const domain = new doc.Domain('brewedhere', {
    name: 'brewedhere.co',
  });

  const api = new API('brewed-here', {}, defaultOpts);

  // const doProject = new doc.Project('brewed-here', {
  //   name: 'brewed-here',
  //   resources: [
  //     pulumi.interpolate`do:domain:${domain.id}`
  //   ],
  // });
}