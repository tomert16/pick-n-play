# start from base 
FROM node:20

# start up working directory
WORKDIR /client

# Copy package.json and package-lock.json files
COPY package.json  .
COPY package-lock.json .

# install dependencies
RUN npm install --silent

# makes the vite executable within the node_modules directory executable.
RUN chmod +x ./node_modules/.bin/vite

# copy files to container 
COPY . .

# expose port 
EXPOSE 8080

# start app 
CMD ["npm", "run", "dev"]