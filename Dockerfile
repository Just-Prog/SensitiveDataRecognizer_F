ARG NODE_VERSION=20.17.0
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:${NODE_VERSION}-alpine AS builder
WORKDIR /vite_app
COPY . /vite_app
RUN npm config set registry https://registry.npmmirror.com
RUN npm install --verbose
RUN npm run build

FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/nginx:stable
COPY --from=builder /vite_app/dist /static_app
COPY --from=builder /vite_app/nginx_docker.conf /etc/nginx/nginx.conf
RUN rm -fr /etc/nginx/conf.d
RUN cp /usr/share/nginx/html/50x.html /static_app
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
