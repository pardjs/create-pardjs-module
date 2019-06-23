# use a node base image
FROM registry.cn-shanghai.aliyuncs.com/pardjs/base:10-alpine
RUN mkdir /usr/share/service
WORKDIR /usr/share/service
COPY ./package.json /usr/share/service
COPY ./yarn.lock /usr/share/service
RUN yarn
COPY . /usr/share/service
RUN yarn run build
RUN rm -rf ./src
RUN ls -al
CMD [ "pm2-runtime", "start", "pm2.json" ]