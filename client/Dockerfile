# start from base 
FROM node:14

# start up working directory
WORKDIR /client

# Copy package.json and package-lock.json files
COPY package.json package-lock.json* ./

# install dependencies
RUN npm install --silent

# copy files to container 
COPY . ./

# expose port 
EXPOSE 8080

# start app 
CMD ["npm", "run", "dev"]