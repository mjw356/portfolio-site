# get node image
FROM node:15-alpine

# Create app directory
WORKDIR /app

# copy the package.json
COPY ./portfolio-site/package*.json ./

#install the node pacakges
RUN npm install

# copy everything over
COPY ./portfolio-site/ .

# expose the port for the application
EXPOSE 3000

#Run application
CMD [ "npm", "start"]