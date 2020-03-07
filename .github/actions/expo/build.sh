#!/bin/sh -l
set -ex

cd app
cat app.json | jq '.expo.sdkVersion' -r > /tmp/expo-sdk-version
yarn global add gulp-cli turtle-cli@$TURTLE_VERSION
turtle setup:$PLATFORM --sdk-version `cat /tmp/expo-sdk-version`
turtle build:android \
  --type app-bundle \
  --public-url https://expo.brewedhere.co \
  -o ./expo-project.aab

# yarn global add expo-cli
# yarn
# expo login -u $EXPO_CLI_USERNAME
# expo publish