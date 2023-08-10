const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const CLIENT =
  process.env.IS_OFFLINE === "true"
    ? new DynamoDBClient({
        region: "localhost",
        endpoint: "http://0.0.0.0:8000",
        credentials: {
          accessKeyId: "cuevacelis",
          secretAccessKey: "Fb21485620",
        },
      })
    : new DynamoDBClient();
const DYNAMO_DB_CLIENT = DynamoDBDocumentClient.from(CLIENT);

async function getAllPeoplesService(event) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message:
            "Go Serverless v3.0! Your function executed successfully! sin id",
          input: event,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "bad",
          input: event,
        },
        null,
        2
      ),
    };
  }
  // const params = {
  //   TableName: USERS_TABLE,
  //   Key: {
  //     userId: req.params.userId,
  //   },
  // };
  // try {
  //   const { Item } = await dynamoDbClient.send(new GetCommand(params));
  //   if (Item) {
  //     const { userId, name } = Item;
  //     res.json({ userId, name });
  //   } else {
  //     res
  //       .status(404)
  //       .json({ error: 'Could not find user with provided "userId"' });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ error: "Could not retreive user" });
  // }
}

async function getByIdPeopleService(event) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message:
            "Go Serverless v3.0! Your function executed successfully ID!",
          input: event,
        },
        null,
        2
      ),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "bad",
          input: event,
        },
        null,
        2
      ),
    };
  }
  // const params = {
  //   TableName: USERS_TABLE,
  //   Key: {
  //     userId: req.params.userId,
  //   },
  // };
  // try {
  //   const { Item } = await dynamoDbClient.send(new GetCommand(params));
  //   if (Item) {
  //     const { userId, name } = Item;
  //     res.json({ userId, name });
  //   } else {
  //     res
  //       .status(404)
  //       .json({ error: 'Could not find user with provided "userId"' });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ error: "Could not retreive user" });
  // }
}

async function createPeopleService(event) {
  try {
    const { peopleId, name } = JSON.parse(event.body);
    //agregar el modelo que verifica los atributos
    if (typeof peopleId !== "string") {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "must be a string",
          input: event,
        }),
      };
    }
    const params = {
      TableName: process.env.PEOPLE_TABLE,
      Item: {
        peopleId: peopleId,
        name: name,
      },
    };

    await DYNAMO_DB_CLIENT.send(new PutCommand(params));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "creado con exito",
        peopleId: peopleId,
        name: name,
        input: event,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not create people",
        IS_OFFLINE: IS_OFFLINE,
        PEOPLE_TABLE: PEOPLE_TABLE,
        input: event,
      }),
    };
  }
  // const { userId, name } = req.body;
  //   if (typeof userId !== "string") {
  //     res.status(400).json({ error: '"userId" must be a string' });
  //   } else if (typeof name !== "string") {
  //     res.status(400).json({ error: '"name" must be a string' });
  //   }

  //   const params = {
  //     TableName: USERS_TABLE,
  //     Item: {
  //       userId: userId,
  //       name: name,
  //     },
  //   };

  //   try {
  //     await dynamoDbClient.send(new PutCommand(params));
  //     res.json({ userId, name });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "Could not create user" });
  //   }
  // });
}

module.exports = {
  getAllPeoplesService,
  getByIdPeopleService,
  createPeopleService,
};
