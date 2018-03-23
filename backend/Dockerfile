# Create image based on the official Node 6 image from the dockerhub
FROM node:8.1  as backend-grifoo

ENV HOME=/usr/src/app

# Create a directory where our app will be placed
RUN mkdir -p ${HOME}
 
# Change directory so that our commands run inside this new directory
WORKDIR ${HOME}

# Copy dependency definitions
COPY package.json ${HOME}

# Install dependecies
RUN npm  install --silent

# Get all the code needed to run the app
COPY . ${HOME}

# Expose the port the app runs in
EXPOSE 3003

# Serve the app
CMD ["npm", "start"]

#docker build --rm -f Dockerfile -t backend-grifoo:latest .
#docker run --rm -d -p 3003:3003 backend-grifoo:latest