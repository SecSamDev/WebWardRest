# Web Ward PostgreSQL

### Motivation
When our aplication has not access to a PostgreSQL database then we need to provide ourselves with the database.  For that readon we deploy a custom PostgreSQL database.

### Usage
If the WebWardRest server dont has access to a postgreSQL databse then it will try to deploy his own database using docker or kubernetes API.

### Docker Build

```
docker build -t secsamdev/ww-postgres .
```