# BUILD
FROM node:18.16.1-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN yarn add react

COPY . .
RUN yarn build

# DEPLOY
FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf
COPY --from=builder app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
