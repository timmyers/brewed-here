import * as pulumi from '@pulumi/pulumi';
import * as doc from '@pulumi/digitalocean';

interface Args {
}

class AppStorage extends pulumi.ComponentResource {
  public constructor(name: string, {
  }: Args, opts?: pulumi.ComponentResourceOptions) {
    super('brewed-here:app-storage', name, { }, opts);

    const defaultOptions = { parent: this };

    const space = new doc.SpacesBucket(name, {
      name,
      region: 'sfo2',
      acl: 'public-read',
    }, defaultOptions);

    const certificate = new doc.Certificate(name, {
      name: 'expo',
      domains: [
        'expo.brewedhere.co',
      ],
      type: doc.CertificateTypes.LetsEncrypt,
    });

    const cdn = new doc.Cdn(name, {
      origin: space.bucketDomainName,
      customDomain: 'expo.brewedhere.co',
      certificateId: certificate.id,
    });
  }
}

export default AppStorage;
