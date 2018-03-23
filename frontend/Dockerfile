# Create image based on the official Node 6 image from the dockerhub
FROM johnpapa/angular-cli as frontend-grifoo

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

#RUN ng build --prod --build-optimizer

EXPOSE 4200

CMD [ "ng", "serve" ]

#docker build --rm -f Dockerfile -t frontend-grifoo:latest .
#docker run --rm -d -p 4200:4200 frontend-grifoo:latest

#FROM nginx:alpine

#LABEL author="Raphael Inácio"

#COPY --from=frontend-grifoo /usr/src/app/dist /usr/share/nginx/html

#EXPOSE 80 4200

#CMD [ "nginx", "-g", "daemon off;" ]

#Comand build image
#docker build --rm -f Dockerfile -t frontend-grifoo:latest .
#docker run --rm -d -p 443:443 -p 80:80 frontend-grifoo:latest



