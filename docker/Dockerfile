# build environment
FROM node:12-alpine as build
WORKDIR /app
RUN npm i -g yarn
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .

ARG API_URL
ENV REACT_APP_API_URL=${API_URL}
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
