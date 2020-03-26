import * as fs from 'fs';
import * as path from 'path';
import * as pulumi from '@pulumi/pulumi';
import * as docker from '@pulumi/docker';
import * as k8s from '@pulumi/kubernetes';
import * as kx from '@pulumi/kubernetesx';

interface Args {
}

class Web extends pulumi.ComponentResource {
  public imageName: pulumi.Output<string>;

  public constructor(name: string, {
  }: Args, opts?: pulumi.ComponentResourceOptions) {
    super('brewed-here:web', name, { }, opts);

    const defaultOptions = { parent: this };

    const dockerhubPassword = process.env.DOCKERHUB_PASSWORD;
    if (dockerhubPassword == undefined) {
      throw new Error('No docker hub password provided')
    }

    const image = new docker.Image('timmyers/brewed-here-web', {
      imageName: 'timmyers/brewed-here-web',
      build: `${path.relative(process.cwd(), __dirname)}/../../../web`,
      registry: {
        server: 'docker.io',
        username: 'timmyers',
        password: dockerhubPassword,
      },
    }, defaultOptions);

    this.imageName = image.imageName;

    const port = 3000;

    const pb = new kx.PodBuilder({
      containers: [{
        image: this.imageName,
        ports: { http: port },
        env: {
          PORT: `${port}`,
        },
        // resources: {
        //   requests: {
        //     cpu: '500m',
        //   },
        // },
      }],
    });

    const deployment = new kx.Deployment(name, {
      spec: pb.asDeploymentSpec({
        // replicas: 3,
      }),
    }, defaultOptions);

    const service = deployment.createService({
      type: kx.types.ServiceType.ClusterIP,
    });

    const ingress = new k8s.networking.v1beta1.Ingress(name, {
      metadata: {
        annotations: {
          'kubernetes.io/ingress.class': 'nginx',
          'external-dns.alpha.kubernetes.io/ttl': '60',
        },
      },
      spec: {
        rules: [{
          host: 'brewedhere.co',
          http: {
            paths: [{
              backend: {
                serviceName: service.metadata.name,
                servicePort: port,
              },
            }],
          },
        }],
      },
    }, defaultOptions);

    this.registerOutputs({
      imageName: this.imageName,
    });
  }
}

export default Web;
