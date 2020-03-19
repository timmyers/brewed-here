const artifact = require('@actions/artifact');
const fs = require('fs');

(async () => {
  const artifactClient = artifact.create();
  const downloadResponse = await artifactClient.downloadArtifact('BUILD_APPS', '.', { createArtifactFolder: false });

  const buildApps = JSON.parse(fs.readFileSync(`${downloadResponse.downloadPath}/buildApps.json`).toString('ascii'))
  console.log(buildApps);

  if (buildApps.buildApps) {
    process.exit(0)
  }
  process.exit(1);
})()

