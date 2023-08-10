module.exports = {
  tables: [
    {
      TableName: `people-table-dev`,
      KeySchema: [{ AttributeName: "peopleId", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "peopleId", AttributeType: "S" }],
      ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
    },
    // etc
  ],
};
