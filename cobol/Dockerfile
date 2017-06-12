FROM debian:jessie

# RUN \
#      echo "deb http://ftp.us.debian.org/debian/ jessie main contrib non-free" >> /etc/apt/sources.list \
#   && echo "deb-src http://ftp.us.debian.org/debian/ jessie main contrib non-free" >> /etc/apt/sources.list \
#   && export DEBIAN_FRONTEND=noninteractive \
#   && apt-get update -q \
#   && apt-get install -q -y -o Dpkg::Options::="--force-confnew" --no-install-recommends \
#              build-essential \
#              ca-certificates \
#              curl \
#              open-cobol \
#              python \
#   && apt-get clean \
#   && rm -rf /var/lib/apt/lists/*

RUN \
     export DEBIAN_FRONTEND=noninteractive \
  && apt-get update \
  && apt-get -y install \
                build-essential \
                ca-certificates \
                curl \
                locales git \
                nodejs \
                nodejs-legacy \
                npm \
                open-cobol \
                python \
                wget \
  && /usr/sbin/update-locale LANG=C.UTF-8 \
  && locale-gen C.UTF-8 \
  && apt-get remove -y locales \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
ENV LANG C.UTF-8


# RUN mkdir /nodejs && curl http://nodejs.org/dist/v0.10.28/node-v0.10.28-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1
# ENV PATH $PATH:/nodejs/bin

WORKDIR /app
ADD package.json /app/
RUN npm install --production
ADD . /app

CMD []
ENTRYPOINT ["/usr/bin/npm","start"]

