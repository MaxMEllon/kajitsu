FROM nginx:1.19.7-alpine

RUN apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del tzdata

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

CMD sh -c "exec nginx -g 'daemon off;'"


