const execa = require('execa');
const { google } = require('googleapis')
const fs = require('fs');

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
    // const { exitCode } = await execa('/build.sh', { stdio: 'inherit' })
    // if (exitCode !== 0) {
    //   process.exit(exitCode);
    // }

    try {
      console.log('Uploading brewed-here.aab to google play...')

      fs.writeFileSync('google.json', Buffer.from(process.env.ANDROID_UPLOAD_KEY_BASE64, 'base64'));
      const auth = new google.auth.GoogleAuth({
        keyFile: './google.json',
        scopes: ['https://www.googleapis.com/auth/androidpublisher']
      });
      const authClient = await auth.getClient()

      const uploader = google.androidpublisher({
        version: 'v3',
        auth: authClient,
      })

      const edit = await uploader.edits.insert({
        packageName: 'co.brewedhere.brewedhere',
      })

      const aabResponse = await uploader.edits.bundles.upload({
        editId: edit.data.id,
        packageName: 'co.brewedhere.brewedhere',
        media: {
          mimeType: 'application/octet-stream',
          body: fs.createReadStream('brewed-here.aab')
        },
      })

      const update = await uploader.edits.tracks.update({
        editId: edit.data.id,
        packageName: 'co.brewedhere.brewedhere',
        track: 'internal',
      })

      const commit = await uploader.edits.commit({
        editId: edit.data.id,
      })
    } catch (err) {
      console.log(err)
    }
  }

  process.exit(0)
});


(async () => {
  try {
      console.log('Uploading brewed-here.aab to google play...')

      fs.writeFileSync('google.json', Buffer.from(process.env.ANDROID_UPLOAD_KEY_BASE64, 'base64'));
      const auth = new google.auth.GoogleAuth({
        keyFile: './google.json',
        scopes: ['https://www.googleapis.com/auth/androidpublisher']
      });
      const authClient = await auth.getClient()

      const uploader = google.androidpublisher({
        version: 'v3',
        auth: authClient,
      })

      const edit = await uploader.edits.insert({
        packageName: 'co.brewedhere.brewedhere',
      })

      const aabResponse = await uploader.edits.bundles.upload({
        editId: edit.data.id,
        packageName: 'co.brewedhere.brewedhere',
        media: {
          mimeType: 'application/octet-stream',
          body: fs.createReadStream('brewed-here.aab')
        },
      })

      const update = await uploader.edits.tracks.update({
        editId: edit.data.id,
        packageName: 'co.brewedhere.brewedhere',
        track: 'internal',
      })

      const commit = await uploader.edits.commit({
        editId: edit.data.id,
      })

    } catch (err) {
      console.log(err)
    }
})()