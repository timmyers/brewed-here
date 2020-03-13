const stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
  inputChunks.push(chunk);
});

stdin.on('end', function () {
  const inputJSON = inputChunks.join();
  const parsedData = JSON.parse(inputJSON);

  parsedData.forEach(subject => {
    if (subject.indexOf('rebuild-app') != -1) {
      console.log(subject)
    }
  })

  console.log()

  process.exit(0)
});
