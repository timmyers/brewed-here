#!/bin/sh -l

yarn
cd infrastructure
helm init --client-only
helm repo update
pulumi preview -s cluster