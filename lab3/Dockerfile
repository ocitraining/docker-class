# Fix to most recent LTS at time of creation.
FROM ubuntu:xenial

# Always provide contact information.
MAINTAINER Mike Martinez <training@objectcomputing.com>

# Install system packages - rsync needed for copying
RUN \
     export DEBIAN_FRONTEND=noninteractive \
  && apt-get update -q \
  && apt-get install -q -y -o Dpkg::Options::="--force-confnew" \
             rsync

# Copy the local files into the image.
COPY Dockerfile /labdata/
RUN chmod -R 02777 /labdata

# Create and setup a command to perform copying.
RUN \
     echo '#!/usr/bin/env bash' > /usr/local/bin/copyto \
  && echo 'umask 0 && rsync -a --no-p --no-o --no-g --chmod=ugo=rwX /labdata $*' >> /usr/local/bin/copyto
RUN chmod +x /usr/local/bin/copyto

