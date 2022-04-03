FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es2c
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install


ARG USER="DATABASE_USER"
ENV USER=$DATABASE_USER

ARG PASSWORD="DATABASE_PASSWORD"
ENV PASSWORD=$DATABASE_PASSWORD

ARG NAME="DATABASE_NAME"
ENV NAME=$DATABASE_NAME

ARG TOKEN="JWT_TOKEN"
ENV TOKEN=$JWT_TOKEN

CMD [ "npm", "start" ]