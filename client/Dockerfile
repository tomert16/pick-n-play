# start from base 
FROM node:20

# Set the working directory to /client (inside the container)
WORKDIR /client

# Add node_modules binary folder to PATH
ENV PATH /client/node_modules/.bin:$PATH

# Copy package.json and package-lock.json files from the client directory to the container
COPY package.json package-lock.json* ./

# Install dependencies (inside the container)
RUN npm install --silent

# Copy the rest of your application files from the client directory to the container
COPY . ./

# expose port 
EXPOSE 8080

# start app 
CMD ["npm", "run", "dev"]