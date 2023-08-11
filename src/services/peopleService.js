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

async function updatePeopleService(eventLambda) {
  try {
    const BODY = JSON.parse(eventLambda.body);
    const RESPONSE_UPDATE = await PeopleModal.updateById({
      peopleId: eventLambda.pathParameters.id,
      body: BODY,
    });
    console.log(RESPONSE_UPDATE);

    if (RESPONSE_UPDATE) {
      return {
        statusCode: RESPONSE_UPDATE.$metadata.httpStatusCode ?? 200,
        body: JSON.stringify({
          message: "¡Persona de SW actualizada o agregada con exito!",
          DynamoDB: RESPONSE_UPDATE.Attributes ?? "No se encontro resultados",
        }),
      };
    } else {
      return {
        statusCode: RESPONSE_UPDATE.$metadata.httpStatusCode ?? 400,
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
        message: "¡Error: Al actualizar una persona de SW!",
      }),
    };
  }
}

async function deletePeopleService(eventLambda) {
  try {
    const RESPONSE_DELETE = await PeopleModal.deleteById({
      peopleId: eventLambda.pathParameters.id,
    });

    if (RESPONSE_DELETE) {
      return {
        statusCode: RESPONSE_DELETE.$metadata.httpStatusCode ?? 200,
        body: JSON.stringify({
          message: "¡Persona de SW eliminada con exito!",
        }),
      };
    } else {
      return {
        statusCode: RESPONSE_DELETE.$metadata.httpStatusCode ?? 400,
        body: JSON.stringify({
          message:
            "Error: Surgio algun problema al eliminar a la persona de SW, al parecer tiene mucha fuerza ",
        }),
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.statusCode ?? 500,
      body: JSON.stringify({
        message: "¡Error: Al eliminar una persona de SW!",
      }),
    };
  }
}

module.exports = {
  getAllPeoplesService,
  getByIdPeopleService,
  createPeopleService,
  updatePeopleService,
  deletePeopleService,
};
