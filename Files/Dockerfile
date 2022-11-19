FROM maven:3.8.6-openjdk-11-slim as builder
WORKDIR /workspace
COPY . .
RUN mvn clean install
CMD mvn spring-boot:run

FROM openjdk:11-jdk-buster
WORKDIR /app
COPY --from=builder /workspace/target/fileUpload-0.0.1-SNAPSHOT.jar /app/app.jar
ENTRYPOINT ["java","-jar","app.jar"]
