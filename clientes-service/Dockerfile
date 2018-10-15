# Alpine Linux with OpenJDK JRE

FROM openjdk:8-jre-alpine as clientes-service

MAINTAINER Raphael Inacio da Silva <contato.raphaelinacio@gmail.com>

COPY target/clientes-service-0.0.1-SNAPSHOT.jar /app.jar

RUN apk add --no-cache bash

COPY run.sh /run.sh

EXPOSE 8081

CMD ["/usr/bin/java", "-jar", "/app.jar"]

# sudo docker build --rm -f Dockerfile -t raphaelinacio/clientes-service:latest .

# sudo docker run --rm -it -p 8081:8081 --network=grifoo_private raphaelinacio/clientes-service:latest
