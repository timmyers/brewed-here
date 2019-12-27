#!/bin/sh -l
set -ex

cd app
yarn global add expo-cli
expo login -u $EXPO_CLI_USERNAME
expo publish