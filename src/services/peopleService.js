const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const scanParams = {
  TableName: "users",
};

const dynamodb = new DynamoDBDocumentClient();
const result = await dynamodb.scan(scanParams).promise();

module.exports = () => {
  // return Object.freeze({ getPeople, createPeople });
  return { getPeople, createPeople };

  async function getPeople(event) {
    try {
      if (result.Count === 0) {
        return {
          statusCode: 404,
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          total: result.Count,
          items: await result.Items.map((customer) => {
            return {
              name: customer.primary_key,
              email: customer.email,
            };
          }),
        }),
      };
    } catch (e) {
      return {
        status: false,
        message: "Error.",
        data: null,
      };
    }
  }

  async function createPeople(data) {
    try {
      if (result.Count === 0) {
        return {
          statusCode: 404,
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          total: result.Count,
          items: await result.Items.map((customer) => {
            return {
              name: customer.primary_key,
              email: customer.email,
            };
          }),
        }),
      };
    } catch (e) {
      return {
        status: false,
        message: "Error.",
        data: null,
      };
    }
  }
};
