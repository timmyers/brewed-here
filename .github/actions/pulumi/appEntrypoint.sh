#!/bin/sh -l
set -ex

yarn global add expo-cli
cd app
yarn
expo login -u $EXPO_CLI_USERNAME
expo publish