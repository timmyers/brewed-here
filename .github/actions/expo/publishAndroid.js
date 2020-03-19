const { google } = require('googleapis')
const fs = require('fs');

(async () => {
  try {
    const { exitCode } = await execa('/buildAndroid.sh', { stdio: 'inherit' })
    if (exitCode !== 0) {
      process.exit(exitCode);
    }

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
      requestBody: {
        releases: [{
          versionCodes: [aabResponse.data.versionCode],
          status: 'completed'
        }]
      }
    })

    const commit = await uploader.edits.commit({
      packageName: 'co.brewedhere.brewedhere',
      editId: edit.data.id,
    })
  } catch (err) {
    console.log(err)
  }
})()