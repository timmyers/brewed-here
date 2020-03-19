const artifact = require('@actions/artifact');
const fs = require('fs');

(async () => {
  const artifactClient = artifact.create();
  const downloadResponse = await artifactClient.downloadArtifact('BUILD_APPS', '.', { createArtifactFolder: false });

  const buildApps = JSON.parse(fs.readFileSync(downloadResponse.downloadPath).toString())
  console.log(buildApps);
})()

