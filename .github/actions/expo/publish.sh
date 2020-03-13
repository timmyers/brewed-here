#!/bin/sh -e
set -ex

cd app
yarn global add expo-cli
yarn

sed -i "s/ANDROID_MAPS_API_KEYS/$ANDROID_MAPS_API_KEYS/g" app.json
expo export --public-url https://expo.brewedhere.co
s3cmd --access_key=$SPACES_ACCESS_KEY_ID --secret_key=$SPACES_SECRET_ACCESS_KEY --host=sfo2.digitaloceanspaces.com --host-bucket="%(bucket)s.sfo2.digitaloceanspaces.com" --acl-public sync dist/* s3://brewed-here
doctl compute cdn flush 4d7ca47f-1ff5-4614-b216-d4f5db0748e4 --files '[*]'