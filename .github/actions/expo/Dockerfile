
FROM node:13.5.0

RUN apt-get update && apt-get -y --no-install-recommends install \
  openjdk-8-jdk=8u232-b09-1~deb9u1 \
  rsync=3.1.2-1+deb9u2 \
  jq=1.5+dfsg-1.3 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/bin/bash"]
