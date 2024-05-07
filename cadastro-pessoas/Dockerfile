FROM node:20.12.2 AS build
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /src/app/dist/cadastro-pessoas /usr/share/nginx/html
EXPOSE 80
