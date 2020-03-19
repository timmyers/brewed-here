FROM node:12.13.1

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG TURTLE_VERSION=0.13.10
ARG PLATFORM=android
ARG SDK_VERSION=36.0.0

RUN apt-get update && apt-get -y --no-install-recommends install \
  openjdk-8-jdk=8u242-b08-1~deb9u1 \
  rsync=3.1.2-1+deb9u2 \
  jq=1.5+dfsg-1.3 \
  python-dateutil=2.5.3-2 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install s3cmd
RUN curl -sL -o s3cmd.tar.gz https://github.com/s3tools/s3cmd/releases/download/v2.0.2/s3cmd-2.0.2.tar.gz \
    && tar -xf s3cmd.tar.gz \
    && cp -r s3cmd-2.0.2/s3cmd s3cmd-2.0.2/S3 /usr/local/bin
  
# Install doctl
RUN curl -sL https://github.com/digitalocean/doctl/releases/download/v1.38.0/doctl-1.38.0-linux-amd64.tar.gz | tar -xzv \
    && mv doctl /usr/local/bin

# Turtle
# RUN yarn global add gulp-cli turtle-cli@$TURTLE_VERSION
# RUN turtle setup:$PLATFORM
# RUN turtle setup:$PLATFORM --sdk-version $SDK_VERSION

COPY build.sh /build.sh
COPY publish.sh /publish.sh
COPY build-entrypoint.sh /build-entrypoint.sh
ENTRYPOINT ["/bin/bash"]
