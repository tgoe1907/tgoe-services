FROM node:18.14-bullseye-slim 

RUN mkdir /project
WORKDIR /project

RUN npm install -g @angular/cli@15

RUN ls -l
COPY tgo-services-frontend/package-lock.json tgo-services-frontend/package.json ./
RUN npm ci


COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]

