# start from base 
FROM node:20.6

# start up working directory
WORKDIR /client

# copy package.json files
COPY package.json .

# install dependencies
RUN npm install

# copy files to container 
COPY . ./

# expose port 
EXPOSE 8080

# start app 
CMD ["npm", "run", "dev"]