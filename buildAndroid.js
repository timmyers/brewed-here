const execa = require('execa');

const stdin = process.stdin;
const inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
  inputChunks.push(chunk);
});

stdin.on('end', async () => {
  const inputJSON = inputChunks.join();
  const parsedData = JSON.parse(inputJSON);

  let doBuild = false
  parsedData.forEach(subject => {
    if (subject.indexOf('build-app') != -1) {
      process.stderr.write(`Found build-app commit: ${subject}\n`)
      doBuild = true
    }
  })

  if (doBuild) {
    await execa('/build.sh')
  }

  process.exit(0)
});
