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
      size: doc.DropletSlugs.DropletS1VCPU2GB,
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

  const nginxNamespace = new k8s.core.v1.Namespace('nginx', {
    metadata: { 
      name: 'nginx',
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
}