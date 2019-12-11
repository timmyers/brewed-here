#!/bin/sh -l
set -ex

export PULUMI_CI_SYSTEM="GitHub"
export PULUMI_CI_BUILD_ID=
export PULUMI_CI_BUILD_TYPE=
export PULUMI_CI_BUILD_URL=
export PULUMI_CI_PULL_REQUEST_SHA="$GITHUB_SHA"

yarn
cd infrastructure
helm init --client-only
helm repo update
pulumi preview -s cluster