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
- Se necesita tener instalado "serverless"
- npm i
- serverless offline
- serverless dynamodb start
- serverless dynamodb migrate
- serverless deploy
```

## EndPoints

A continuación se presentaran los endpoints del proyecto para su uso.

### People

```
GET: Se obtienen todos las personas de la pelicula Star Wars, de DynamoDB como de la API SWAPI.
https://24pvqepr5h.execute-api.us-east-1.amazonaws.com/api/people
```

```
GET: Se buscan los datos de una persona por ID de la pelicula de Star Was, de DynamoDB como de la API SWAPI.
https://24pvqepr5h.execute-api.us-east-1.amazonaws.com/api/people/{id}
```

```
POST: Se agrega nuevas personas a la pelicula de Star Was en DynamoDB.
https://24pvqepr5h.execute-api.us-east-1.amazonaws.com/api/people

Body Example:
{
    "peopleId":"1",
    "nombre":"Skywalker",
    "altura": "167",
    "masa": "75",
    "color_de_pelo": "n/a",
    "color_de_piel": "gold",
    "color_de_ojos": "yellow",
    "año_de_nacimiento": "112BBY",
    "genero": "n/a",
    "mundo_natal": "https://swapi.dev/api/planets/1/",
    "peliculas": [],
    "especies": [],
    "vehiculos": [],
    "naves_estelares": [],
    "creado": "2014-12-10T15:10:51.357000Z",
    "editado": "2014-12-20T21:17:50.309000Z",
    "vinculo": "https://swapi.dev/api/people/2/"
}
```
