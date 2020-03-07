#!/bin/sh -l
set -ex

cd app
yarn global add expo-cli
yarn
expo export --public-url https://expo.brewedhere.co
s3cmd --access_key=$SPACES_ACCESS_KEY_ID --secret_key=$SPACES_SECRET_ACCESS_KEY --host=sfo2.digitaloceanspaces.com --host-bucket="%(bucket)s.sfo2.digitaloceanspaces.com" --acl-public sync dist s3://brewed-here