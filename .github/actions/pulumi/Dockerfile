FROM node:13.2.0-alpine

ARG PULUMI_URL="https://get.pulumi.com/releases/sdk/pulumi-v1.6.1-linux-x64.tar.gz"
ARG HELM_URL="https://storage.googleapis.com/kubernetes-helm/helm-v2.14.3-linux-amd64.tar.gz"

RUN apk --no-cache add --update \
    curl \
    build-base \
    # python \
    libc6-compat \
    docker \
    python3

WORKDIR /tmp

# Install pulumi
RUN curl -s $PULUMI_URL -o pulumi.tar.gz \
    && tar -xf pulumi.tar.gz \
    && cp pulumi/* /usr/bin

# Install helm
RUN curl -s $HELM_URL -o helm.tar.gz \
    && mkdir helm \
    && tar -xf helm.tar.gz -C helm \
    && mv ./helm/linux-amd64/helm /usr/bin \
    && mv ./helm/linux-amd64/tiller /usr/bin

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]