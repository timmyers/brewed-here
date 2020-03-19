#!/bin/sh -l
set -ex

yarn
yarn semantic-release

echo "TURTLE BUILD $TURTLE_BUILD"