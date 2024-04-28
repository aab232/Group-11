# Base Image
FROM node:20.11.1
WORKDIR /app

#Install dependencies and copy files to conatiner

COPY . .

RUN npm install --silent

# start app
CMD ["node","server.js"]