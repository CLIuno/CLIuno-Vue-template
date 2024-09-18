FROM nginx:alpine as prod

ENV WORKDIR=/c4istar

WORKDIR $WORKDIR

ARG version
ENV COMMITID=$version


COPY /dist /c4istar
COPY /docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
