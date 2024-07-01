ARG PORT=3000

FROM node:latest

#Create directory in container image for app code
RUN mkdir /usr/src/app

#Copy app code (./citymapbox) to /usr/src/app/ in container image
COPY ../../kjg-projects/citymapbox /usr/src/app/

#Set working directory
WORKDIR /usr/src/app

#Install dependencies from packages.json
RUN npm install

#Set container listen port
EXPOSE ${PORT}

#Command for container to execute or run the app
ENTRYPOINT [ "npm" , "start" ]