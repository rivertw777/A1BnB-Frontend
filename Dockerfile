# BUILD
FROM node:18.16.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn add react
COPY . .
RUN npm run build

# Deploy
FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
