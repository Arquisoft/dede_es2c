FROM node:16.13.1
LABEL org.opencontainers.image.source https://github.com/Arquisoft/dede_es2c
COPY . /app
WORKDIR /app
#Install the dependencies
RUN npm install

ARG REACT_APP_API_URI="http://localhost:5000"
ENV REACT_APP_API_URI=$REACT_APP_API_URI

ARG REACT_APP_URI="http://localhost:3000"
ENV REACT_APP_URI_URI=$REACT_APP_URI

#Create an optimized version of the webapp
RUN npm run build

#Ver como podemos llamar npm run prod aquí
CMD ["npm", "run", "prod"]