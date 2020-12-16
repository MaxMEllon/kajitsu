FROM node:14-slim as node

RUN apt-get update \
    && apt-get install -y locales tzdata busybox \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && echo "# Install Busybox" \
    && mkdir /usr/local/busybox \
    && busybox --install /usr/local/busybox \
    && echo "# Generate locale" \
    && echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen \
    && echo "ja_JP.UTF-8 UTF-8" >> /etc/locale.gen \
    && locale-gen
ENV PATH "$PATH:/usr/local/busybox"
ENV TZ "Asia/Tokyo"
ENV LANG "ja_JP.UTF-8"
ENV LC_ALL "ja_JP.UTF-8"


FROM node AS build
WORKDIR /sources
COPY yarn.lock package.json tsconfig.json tsconfig.node.json ./
COPY . ./
RUN yarn && yarn build

FROM node AS app

WORKDIR /app
COPY --from=build /sources/node_modules/ /app/node_modules
COPY --from=build /sources/packages/ /app/packages

WORKDIR /app/packages/melon
CMD yarn run -s production
