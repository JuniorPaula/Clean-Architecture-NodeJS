# API de Enquetes

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Mongodb](https://img.shields.io/badge/mongodb-6DA55F?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)


Aplicação consciste em um **API** de **Enquetes**. Foi desenvolvida ultilzando um arquitetura bem definida e desacoplada, ultilizando **TDD** como metotologia de trabalho e **Clean Architecture** para fazer a distribição das resposabildades em camadas, e sempre que possível ultilizando os principios do **SOLID**.

### Instruções para rodar o projeto

Os requisitos necessários são:

- Node
- npm
- Mongodb

Faça o clone do projeto e rode o comando `npm install` para instalar as dependências.

~~~javascript
npm install
~~~

Subir o servidor de desenvolvimento atravéz do comando `npm run dev`

~~~javascript
npm run dev
~~~

Configurar as variáveis de ambiente criando um arquivo `.env` na raiz do projeto, e seguindo o examplo do arquivo `.env.example`.


## Testes

~~~javascript
npm test
~~~

## Documentação
A documentação completa pode ser encontrada no **Swagger** através do endpoits `/api-docs`

## Principais funcionalidades
- Cadastro
- Login
- Criar enquetes
- Listar enquetes
- Responder enquetes
- Resultado da enquete

## Endpoints da aplicação

## Rota de Cadastro

~~~javascript
[POST] /signup
~~~

## **Request body**
~~~javascript
{
   "name": "string",
   "email": "string",
   "password": "string",
   "passwordConfirmation": "string"
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
{
    "accessToken": "string",
    "name": "string"
}
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~

## Rota de Login

~~~javascript
[POST] /login
~~~

## **Request body**
~~~javascript
{
  "email": "string",
  "password": "string"
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
{
    "accessToken": "string",
    "name": "string"
}
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~

## Rota de Criar enquetes **private**

~~~javascript
[POST] /surveys
~~~

## **Parameters in header**

~~~javascript
{
"x-access-token": "string"
}
~~~
## **Request body**
~~~javascript
{
"question": "string",
  "answers": [
    {
      "image": "string",
      "answer": "string"
    }
  ]
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/No%20content-204-green)

![Generic badge](https://img.shields.io/badge/Access%20denied-403-orange)
![Generic badge](https://img.shields.io/badge/Bad%20request-404-red)
![Generic badge](https://img.shields.io/badge/Internal%20Server%20Error-500-red)

~~~javascript
{
    "error": "string"
}
~~~

## Rota de Listar enquetes **private**

~~~javascript
[GET] /surveys
~~~

## **Parameters in header**

~~~javascript
{
"x-access-token": "string"
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-green)

~~~javascript
[
  {
    "id": "string",
    "question": "string",
    "answers": [
      {
        "image": "string",
        "answer": "string"
      }
    ],
    "date": "string",
    "didAnswer": boolean
  }
]
~~~

![Generic badge](https://img.shields.io/badge/Access%20denied-403-orange)
![Generic badge](https://img.shields.io/badge/Bad%20request-404-red)
![Generic badge](https://img.shields.io/badge/Internal%20Server%20Error-500-red)

~~~javascript
{
    "error": "string"
}
~~~

## Rota para criar resposta de uma enquete **private**

~~~javascript
[PUT] /surveys/{surveyId}/results
~~~

## **Parameters in header**

~~~javascript
{
"x-access-token": "string"
}
~~~

## **Parameters in route**

~~~javascript
{
"surveyId": "string"
}
~~~

## **Request body**
~~~javascript
{
  "answer": "string"
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-green)

~~~javascript
{
  "surveyId": "string",
  "question": "string",
  "answers": [
    {
      "image": "string",
      "answer": "string",
      "count": number,
      "percent": number,
      "isCurrentAccountAnswer": boolean
    }
  ],
  "date": "string"
}
~~~

![Generic badge](https://img.shields.io/badge/Access%20denied-403-orange)
![Generic badge](https://img.shields.io/badge/Bad%20request-404-red)
![Generic badge](https://img.shields.io/badge/Internal%20Server%20Error-500-red)

~~~javascript
{
    "error": "string"
}
~~~

## Rota para consultar o resultado de uma enquete **private**

~~~javascript
[GET] /surveys/{surveyId}/results
~~~

## **Parameters in header**

~~~javascript
{
"x-access-token": "string"
}
~~~

## **Parameters in route**

~~~javascript
{
"surveyId": "string"
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-green)

~~~javascript
{
  "surveyId": "string",
  "question": "string",
  "answers": [
    {
      "image": "string",
      "answer": "string",
      "count": number,
      "percent": number,
      "isCurrentAccountAnswer": boolean
    }
  ],
  "date": "string"
}
~~~

![Generic badge](https://img.shields.io/badge/Access%20denied-403-orange)
![Generic badge](https://img.shields.io/badge/Bad%20request-404-red)
![Generic badge](https://img.shields.io/badge/Internal%20Server%20Error-500-red)

~~~javascript
{
    "error": "string"
}
~~~

