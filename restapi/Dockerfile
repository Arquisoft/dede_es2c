FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es2c
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install


ARG DATABASE_USER="admin"
ENV DATABASE_USER=$DATABASE_USER

ARG DATABASE_PASSWORD="es2c"
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD

ARG DATABASE_NAME="TestDataBase"
ENV DATABASE_NAME=$DATABASE_NAME

ARG JWT_TOKEN="es2c_group"
ENV JWT_TOKEN=$JWT_TOKEN

CMD [ "npm", "start" ]