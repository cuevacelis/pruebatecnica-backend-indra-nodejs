const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

function DB_CONNECT_DYNAMO_DB_CLIENT() {
  try {
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
    const DESTROY_DYNAMO = () => {
      DYNAMO_DB_CLIENT.destroy();
      CLIENT.destroy();
    };

    return [DYNAMO_DB_CLIENT, DESTROY_DYNAMO];
  } catch (error) {
    throw new Error("Error connect DB");
  }
}

module.exports = { DB_CONNECT_DYNAMO_DB_CLIENT };
