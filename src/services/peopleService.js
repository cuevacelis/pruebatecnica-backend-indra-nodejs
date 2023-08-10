const { PeopleModal } = require("../models/peopleModals");

async function getAllPeoplesService(eventLambda) {
  try {
    const { Items } = await PeopleModal.getAll({});
    return {
      statusCode: 200,
      body: JSON.stringify({
        message:
          "Go Serverless v3.0! Your function executed successfully! sin id",
        input: eventLambda,
        Items,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "bad",
        input: eventLambda,
      }),
    };
  }
}

async function getByIdPeopleService(eventLambda) {
  try {
    const { Item } = await PeopleModal.getById({
      peopleId: eventLambda.pathParameters.id,
    });

    if (Item) {
      const { peopleId, name } = Item;
      return {
        statusCode: 200,
        body: JSON.stringify({
          message:
            "Go Serverless v3.0! Your function executed successfully ID!",
          peopleId,
          name,
          input: eventLambda,
        }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Could not find user with provided "peopleId"',
          input: eventLambda,
        }),
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "bad",
        input: eventLambda,
      }),
    };
  }
}

async function createPeopleService(eventLambda) {
  try {
    const BODY = JSON.parse(eventLambda.body);
    const { peopleId, name } = BODY;
    //agregar el modelo que verifica los atributos
    if (typeof peopleId !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "must be a string",
          input: eventLambda,
        }),
      };
    }

    await PeopleModal.create({
      body: BODY,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "creado con exito",
        peopleId: peopleId,
        name: name,
        input: eventLambda,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not create people",
        IS_OFFLINE: process.env.IS_OFFLINE,
        PEOPLE_TABLE: process.env.PEOPLE_TABLE,
        input: eventLambda,
      }),
    };
  }
}

module.exports = {
  getAllPeoplesService,
  getByIdPeopleService,
  createPeopleService,
};
