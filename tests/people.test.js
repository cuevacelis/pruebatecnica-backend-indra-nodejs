const {
  getPeople,
  createPeople,
} = require("../src/controllers/PeopleController");
const { DocumentClient } = require("aws-sdk/clients/dynamodb");
const config = {
  convertEmptyValues: true,
  ...(process.env.JEST_WORKER_ID && {
    endpoint: "localhost:8000",
    sslEnabled: false,
    region: "local-env",
  }),
};

const ddb = new DocumentClient(config);

describe("Test Controller People", () => {
  it("should insert item into table People", async () => {
    await ddb
      .put({
        TableName: "people-table-dev",
        Item: { peopleId: "1", nombre: "Star Wars" },
      })
      .promise();

    const { Item } = await ddb
      .get({ TableName: "people-table-dev", Key: { peopleId: "1" } })
      .promise();

    expect(Item).toEqual({
      peopleId: "1",
      nombre: "Star Wars",
    });
  });

  it("Event getPeople with parameters", async () => {
    expect.assertions(2);
    const EVENT = {
      body: null,
      cookies: [],
      headers: {
        "user-agent": "PostmanRuntime/7.32.3",
        accept: "*/*",
        "postman-token": "f272f5c7-2554-4dd6-8069-6829f86e4fc9",
        host: "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        connection: "keep-alive",
      },
      isBase64Encoded: false,
      pathParameters: { id: "1" },
      queryStringParameters: null,
      rawPath: "/api/people/1",
      rawQueryString: "",
      requestContext: {
        accountId: "offlineContext_accountId",
        apiId: "offlineContext_apiId",
        authorizer: { jwt: [Object] },
        domainName: "offlineContext_domainName",
        domainPrefix: "offlineContext_domainPrefix",
        http: {
          method: "GET",
          path: "/api/people/1",
          protocol: "HTTP/1.1",
          sourceIp: "::1",
          userAgent: "PostmanRuntime/7.32.3",
        },
        operationName: undefined,
        requestId: "offlineContext_resourceId",
        routeKey: "GET /api/people/{id}",
        stage: "$default",
        time: "10/Aug/2023:16:49:44 -0500",
        timeEpoch: 1691704184541,
      },
      routeKey: "GET /api/people/{id}",
      stageVariables: null,
      version: "2.0",
    };
    const result = await getPeople(EVENT);
    expect(result).toHaveProperty("statusCode");
    expect(result).toHaveProperty("body");
  });

  it("Event getPeople without parameters", async () => {
    expect.assertions(2);
    const EVENT = {
      body: null,
      cookies: [],
      headers: {
        "user-agent": "PostmanRuntime/7.32.3",
        accept: "*/*",
        "postman-token": "b3b230b3-c597-4af5-bcb9-94f95cc7f0dd",
        host: "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        connection: "keep-alive",
      },
      isBase64Encoded: false,
      pathParameters: null,
      queryStringParameters: null,
      rawPath: "/api/people",
      rawQueryString: "",
      requestContext: {
        accountId: "offlineContext_accountId",
        apiId: "offlineContext_apiId",
        authorizer: { jwt: [Object] },
        domainName: "offlineContext_domainName",
        domainPrefix: "offlineContext_domainPrefix",
        http: {
          method: "GET",
          path: "/api/people",
          protocol: "HTTP/1.1",
          sourceIp: "::1",
          userAgent: "PostmanRuntime/7.32.3",
        },
        operationName: undefined,
        requestId: "offlineContext_resourceId",
        routeKey: "GET /api/people",
        stage: "$default",
        time: "10/Aug/2023:16:48:42 -0500",
        timeEpoch: 1691704122161,
      },
      routeKey: "GET /api/people",
      stageVariables: null,
      version: "2.0",
    };
    const result = await getPeople(EVENT);
    expect(result).toHaveProperty("statusCode");
    expect(result).toHaveProperty("body");
  });

  it("Event createPeople", async () => {
    expect.assertions(2);
    const EVENT = {
      body:
        "{\r\n" +
        '    "peopleId":"1",\r\n' +
        '    "nombre":"Skywalker",\r\n' +
        '    "altura": "167",\r\n' +
        '    "masa": "75",\r\n' +
        '    "color_de_pelo": "n/a",\r\n' +
        '    "color_de_piel": "gold",\r\n' +
        '    "color_de_ojos": "yellow",\r\n' +
        '    "año_de_nacimiento": "112BBY",\r\n' +
        '    "genero": "n/a",\r\n' +
        '    "mundo_natal": "https://swapi.dev/api/planets/1/",\r\n' +
        '    "peliculas": [],\r\n' +
        '    "especies": [],\r\n' +
        '    "vehiculos": [],\r\n' +
        '    "naves_estelares": [],\r\n' +
        '    "creado": "2014-12-10T15:10:51.357000Z",\r\n' +
        '    "editado": "2014-12-20T21:17:50.309000Z",\r\n' +
        '    "vinculo": "https://swapi.dev/api/people/2/"\r\n' +
        "}",
      cookies: [],
      headers: {
        "content-type": "application/json",
        "user-agent": "PostmanRuntime/7.32.3",
        accept: "*/*",
        "postman-token": "78cbc1f3-6001-48b9-ae8e-1695cba3f136",
        host: "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        connection: "keep-alive",
        "content-length": "535",
      },
      isBase64Encoded: false,
      pathParameters: null,
      queryStringParameters: null,
      rawPath: "/api/people",
      rawQueryString: "",
      requestContext: {
        accountId: "offlineContext_accountId",
        apiId: "offlineContext_apiId",
        authorizer: { jwt: [Object] },
        domainName: "offlineContext_domainName",
        domainPrefix: "offlineContext_domainPrefix",
        http: {
          method: "POST",
          path: "/api/people",
          protocol: "HTTP/1.1",
          sourceIp: "::1",
          userAgent: "PostmanRuntime/7.32.3",
        },
        operationName: undefined,
        requestId: "offlineContext_resourceId",
        routeKey: "POST /api/people",
        stage: "$default",
        time: "10/Aug/2023:16:53:46 -0500",
        timeEpoch: 1691704426334,
      },
      routeKey: "POST /api/people",
      stageVariables: null,
      version: "2.0",
    };
    const result = await createPeople(EVENT);
    expect(result).toHaveProperty("statusCode");
    expect(result).toHaveProperty("body");
  });
});
