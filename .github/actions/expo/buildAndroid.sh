#!/bin/bash
set -ex

yarn
cd app

echo $EXPO_ANDROID_KEYSTORE_BASE64 > expo-project.jks.base64
base64 --decode expo-project.jks.base64 > expo-project.jks

sed -i "s/ANDROID_MAPS_API_KEYS/$ANDROID_MAPS_API_KEYS/g" app.json

yarn global add gulp-cli turtle-cli@$TURTLE_VERSION
turtle setup:android
# turtle build:android --keystore-path=$GITHUB_WORKSPACE/app/expo-project.jks --keystore-alias=$EXPO_ANDROID_KEYSTORE_ALIAS --public-url=https://expo.brewedhere.co/android-index.json --type=app-bundle --output=brewed-here.aab --config $GITHUB_WORKSPACE/app/app.json
turtle build:android --keystore-path=./expo-project.jks --keystore-alias=$EXPO_ANDROID_KEYSTORE_ALIAS --public-url=https://expo.brewedhere.co/android-index.json --type=app-bundle --output=brewed-here.aab

cp /publishAndroid.js . && node publishAndroid.js