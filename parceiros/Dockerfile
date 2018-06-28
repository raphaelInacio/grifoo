# Create image based on the official Node 8.1 image from the dockerhub
FROM node:8.1 as parceiros-service

ENV HOME=/usr/src/app

ENV QUEUE_NAME=email-queued

ENV USER_NAME=grifoo

ENV USER_PASS=6977baed673c6ae35b230ea5f312961araphaelgrifo

ENV EMAIL_KEY=key-6977baed673c6ae35b230ea5f312961a

ENV USER_PASS_64=Z3JpZm9vOjY5NzdiYWVkNjczYzZhZTM1YjIzMGVhNWYzMTI5NjFhcmFwaGFlbGdyaWZv

ENV URL_PEDIDOS=http://pedidos:3003/api/v1

ENV URL_PARCEIROS=http://parceiros:3004/api/v1

ENV DB=mongodb://db/db_data

ENV REDIS=redis://queue:6379

ENV PARCEIRO_QUEUE_NAME=parceiro-queued

ENV EMAIL_QUEUE_NAME=email-queued

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
EXPOSE 3004

# Serve the app
CMD ["npm", "start"]

# sudo docker build --rm -f Dockerfile -t raphaelinacio/parceiros-service:latest .

# sudo docker run --rm -it -p 3004:3004 --network=grifoo_private raphaelinacio/parceiros-service:latest

# sudo docker run --rm -it -p 3004:3004 --link db:db raphaelinacio/parceiros-service:latest 