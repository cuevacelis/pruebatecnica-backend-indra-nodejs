const {
  ScanCommand,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const { DB_CONNECT_DYNAMO_DB_CLIENT } = require("../database/config");
const [DYNAMO_DB_CLIENT, DESTROY_DYNAMO] = DB_CONNECT_DYNAMO_DB_CLIENT();
const TableName = process.env.PEOPLE_TABLE;

class PeopleModal {
  static async getAll({}) {
    try {
      const params = {
        TableName: TableName,
        KeyConditionExpression: "",
        // ExpressionAttributeValues: {
        //   ":originCountry": "Ethiopia",
        //   ":roastDate": "2023-05-01",
        // },
        // ConsistentRead: true,
      };
      return DYNAMO_DB_CLIENT.send(new ScanCommand(params));
    } catch (error) {
      throw error;
    }
  }

  static async getById({ peopleId }) {
    try {
      const params = {
        TableName: TableName,
        Key: {
          peopleId: peopleId,
        },
      };
      return DYNAMO_DB_CLIENT.send(new GetCommand(params));
    } catch (error) {
      throw error;
    }
  }

  static async create({ body }) {
    try {
      const params = {
        TableName: process.env.PEOPLE_TABLE,
        Item: {
          peopleId: body.peopleId,
          name: body.name,
        },
      };

      return DYNAMO_DB_CLIENT.send(new PutCommand(params));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { PeopleModal };
