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

#Replace Values
#acrName = grifoocontainer
#acrServer = grifoocontainer.azurecr.io


#Build Image
#sudo docker build --rm -f Dockerfile -t frontend-grifoo:latest .

#Run Image in Container 
#sudo docker run --rm -d -p 4200:4200 frontend-grifoo:latest

#Tag Image with azure container registry
#sudo docker tag frontend-grifoo grifoocontainer.azurecr.io/frontend-grifoo:v1

#Push Image in azure container registry
#sudo docker push grifoocontainer.azurecr.io/frontend-grifoo:v1

#List images
#az acr repository list --name grifoocontainer.azurecr.io --output table

#Show tags
#az acr repository show-tags --name <acrName> --repository aci-tutorial-app --output table


