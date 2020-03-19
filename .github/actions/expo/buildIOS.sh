#!/bin/bash
set -ex

yarn

cd app

yarn global add gulp-cli turtle-cli@$TURTLE_VERSION
turtle setup:ios
turtle build:ios
