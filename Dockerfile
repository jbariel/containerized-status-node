FROM alpine:latest

WORKDIR /home

COPY package.json LICENSE lib ./

RUN apk add -U nodejs npm && npm install --production

EXPOSE 8888

CMD [ "node", "index.js" ]