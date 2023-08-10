const { PeopleModal } = require("../models/peopleModals");
const { PeopleSwapiModal } = require("../models/peopleSwapiModals");
const swapi = require("swapi-node");

async function getAllPeoplesService(eventLambda) {
  try {
    const { Items } = await PeopleModal.getAll({});
    const RESPONSE_PEOPLE_SWAPI_ALL = await PeopleSwapiModal.getAll({});
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "¡Datos de SW obtenidos con exito!",
        DynamoDB: Items,
        Swapi: RESPONSE_PEOPLE_SWAPI_ALL,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.statusCode ?? 500,
      body: JSON.stringify({
        message: "¡Error: Al obtener los datos de SW!",
      }),
    };
  }
}

async function getByIdPeopleService(eventLambda) {
  try {
    const { Item } = await PeopleModal.getById({
      peopleId: eventLambda.pathParameters.id,
    });
    const RESPONSE_PEOPLE = await PeopleSwapiModal.getById({
      peopleId: eventLambda.pathParameters.id,
    });

    if (Item || RESPONSE_PEOPLE) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "¡Persona de SW obtenida con exito!",
          DynamoDB: Item ?? "No se encontro resultados",
          Swapi: RESPONSE_PEOPLE ?? "No se encontro resultados",
        }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Falta el campo de "peopleId":"1" como string',
        }),
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.statusCode ?? 500,
      body: JSON.stringify({
        message: "¡Error: Al buscar una persona de SW!",
      }),
    };
  }
}

async function createPeopleService(eventLambda) {
  try {
    const BODY = JSON.parse(eventLambda.body);
    if (typeof BODY.peopleId !== "string" || BODY.peopleId.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Error: "peopleId" de tipo string, faltante o vacio',
        }),
      };
    }

    if (typeof BODY.nombre !== "string" || BODY.nombre.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Error: "nombre" de tipo string, faltante o vacio',
        }),
      };
    }

    await PeopleModal.create({
      body: BODY,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "¡Persona de Star Wars agregada con exito :)!",
        peopleId: BODY.peopleId,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.statusCode ?? 500,
      body: JSON.stringify({
        message: "¡Error: Al agregar nueva persona de SW!",
      }),
    };
  }
}

module.exports = {
  getAllPeoplesService,
  getByIdPeopleService,
  createPeopleService,
};
