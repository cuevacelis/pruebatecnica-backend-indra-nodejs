<!--
title: 'Serverless Framework Node Express API service backed by DynamoDB on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API service backed by DynamoDB running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Prueba Tecnica API Serveless AWS Node.js - DynamoDB

EL presente repositorio consta de la prueba tecnica para backend de Indra.

## Scripts de funcionamiento

```
- npm install -g serverless
- npm i
- serverless offline
- serverless dynamodb start
- serverless dynamodb migrate
- serverless deploy
```

## Documentación de EndPoints

A continuación se presentaran los endpoints del proyecto para su uso.

### People

```
GET: Se obtienen todas las personas de la pelicula Star Wars, en DynamoDB y la API SWAPI.
https://24pvqepr5h.execute-api.us-east-1.amazonaws.com/api/people
```

```
GET: Se buscan los datos de una persona por ID de las peliculas de Star Wars, en DynamoDB y la API SWAPI.
https://24pvqepr5h.execute-api.us-east-1.amazonaws.com/api/people/{id}
```

```
POST: Se agrega nuevas personas al mundo de Star Wars en DynamoDB.
https://24pvqepr5h.execute-api.us-east-1.amazonaws.com/api/people

Body Payload Example:
{
    "peopleId":"1",
    "nombre":"Skywalker",
    "altura": "172",
    "masa": "77",
    "color_de_pelo": "blond",
    "color_de_piel": "fair",
    "color_de_ojos": "blue",
    "anio_de_nacimiento": "19BBY",
    "genero": "male",
    "mundo_natal": "https://swapi.dev/api/planets/1/",
    "peliculas": [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/"
    ],
    "vehiculos": [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/"
    ],
    "naves_estelares": [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/"
    ],
    "creado": "2014-12-09T13:50:51.644000Z",
    "editado": "2014-12-20T21:17:56.891000Z",
    "vinculo": "https://swapi.dev/api/people/1/"
}
```

```
PATCH: Se actualizan todos o algunos de los atributos de las personas del mundo de Star Wars en DynamoDB.
https://24pvqepr5h.execute-api.us-east-1.amazonaws.com/api/people/{id}

Body Payload Example:
{
    "nombre":"Nuevo Skywalker",
}

{
    "nombre":"Nuevo Skywalker",
    "altura": "172",
}

{
    "vinculo": "https://google.com"
}
```

```
DELETE: Se eliminan a las personas por Id del mundo de Star Wars en DynamoDB.
https://24pvqepr5h.execute-api.us-east-1.amazonaws.com/api/people/{id}
```

## Realizado

- 5 endpoints
- Integración con la base de datos DynamoDB
- Integración con SWAPI
- Uso de Serverless Framework
- Uso de Node.js
- Respeto de las buenas prácticas de desarrollo
- Traducción de campos de inglés a español en SWAPI
- Documentación de uso
- Pruebas unitarias
- Desplegar sin errores en AWS con el comando deploy del framework serverless
- Mayor complejidad de Integración
