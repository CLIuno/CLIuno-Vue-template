FROM nginx:alpine as prod

ENV WORKDIR=/app

WORKDIR $WORKDIR

ARG version
ENV COMMITID=$version


COPY /dist /app
COPY /docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
