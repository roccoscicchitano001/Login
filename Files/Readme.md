## File Upload / Download Example using Spring Boot and MongoDB
### Applicazione rivista da Rocco Scicchitano


## Getting Started

**1. Specifica il tuo database**

Open `src/main/resources/application.properties` file and change following properties accordingly.

```properties
spring.data.mongodb.port = [db port]
spring.data.mongodb.host = [host]
spring.data.mongodb.database = [database name]
spring.data.mongodb.username = [database user]
spring.data.mongodb.password = [database password]
```


## REST end-points per integrazione a modulo terzo
* Caricare un file: `http://localhost:8080/file/upload`
* Scaricare un file: `http://localhost:8080/file/download/{id}`

##

## Facilità di utilizzo
* Il tutto sarà comodamente integrato in un unico Docker
* Enjoy the project, Hasta La Vista Siempre!

##

