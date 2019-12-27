#!/bin/sh -l
set -ex

yarn global add expo-cli
cd app
yarn
expo publish