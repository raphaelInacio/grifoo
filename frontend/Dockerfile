# FROM nginx as frontend-grifoo

# COPY ./dist/ /usr/share/nginx/html

# EXPOSE 80

# Stage 0, "build-stage", based on Node.js, to build and compile Angular
FROM node:10.5 as build-stage

ENV HOME=/usr/src/app

ENV DIST=/dist/

# Change directory so that our commands run inside this new directory
WORKDIR ${HOME}

# Copy dependency definitions
COPY package.json ${HOME}

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . ${HOME}

#RUN npm run build -- --output-path=./dist/out --configuration $configuration

RUN npm run build --production

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13 as frontend-service

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

#COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


# sudo docker build --rm -f Dockerfile -t raphaelinacio/frontend-service:latest .

# sudo docker run --rm -it -p 80:80 --network=grifoo_private raphaelinacio/frontend-service:latest

# sudo docker run --rm -it -p 80:80 --link db:db raphaelinacio/worker-service:latest 