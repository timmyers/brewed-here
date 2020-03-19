const fs = require('fs');

(async () => {
  const file = fs.readFileSync('buildApps.json');
  const buildApps = JSON.parse(file.toString('ascii'))
  console.log(buildApps);

  if (buildApps.buildApps) {
    process.exit(0)
  }
  process.exit(1);
})()

