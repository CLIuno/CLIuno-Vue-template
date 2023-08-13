FROM nginx:alpine as prod

ENV WORKDIR=/cliuno

WORKDIR $WORKDIR

ARG version
ENV COMMITID=$version


COPY /dist /cliuno
COPY /docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
