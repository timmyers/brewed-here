#!/bin/sh -l
set -ex

cd app
cat app.json | jq '.expo.sdkVersion' -r > /tmp/expo-sdk-version
yarn global add gulp-cli turtle-cli@$TURTLE_VERSION
turtle setup:$PLATFORM --sdk-version `cat /tmp/expo-sdk-version`

echo $EXPO_ANDROID_KEYSTORE_BASE64 > expo-project.jks.base64
base64 --decode expo-project.jks.base64 > expo-project.jks

turtle build:android \
  --keystore-path ./expo-project.jks \
  --keystore-alias $EXPO_ANDROID_KEYSTORE_ALIAS \
  --type app-bundle \
  --public-url https://expo.brewedhere.co/android-index.json \
  -o brewed-here.aab