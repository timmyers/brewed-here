#!/bin/sh -l
set -ex

yarn
cd infrastructure
helm init --client-only
helm repo update
pulumi $OPERATION -s cluster