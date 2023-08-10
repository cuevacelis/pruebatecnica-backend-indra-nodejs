const {
  ScanCommand,
  GetCommand,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");
const { DB_CONNECT_DYNAMO_DB_CLIENT } = require("../database/config");
const [DYNAMO_DB_CLIENT, DESTROY_DYNAMO] = DB_CONNECT_DYNAMO_DB_CLIENT();
const TableName = process.env.PEOPLE_TABLE;

class PeopleModal {
  constructor(entity) {
    this.peopleId = entity.peopleId;
    this.nombre = entity.nombre;
    this.altura = entity.altura;
    this.masa = entity.masa;
    this.color_de_pelo = entity.color_de_pelo;
    this.color_de_piel = entity.color_de_piel;
    this.color_de_ojos = entity.color_de_ojos;
    this.año_de_nacimiento = entity.año_de_nacimiento;
    this.genero = entity.genero;
    this.mundo_natal = entity.mundo_natal;
    this.peliculas = entity.peliculas;
    this.especies = entity.especies;
    this.vehiculos = entity.vehiculos;
    this.naves_estelares = entity.naves_estelares;
    this.creado = entity.creado;
    this.editado = entity.editado;
    this.vinculo = entity.vinculo;
  }

  static async getAll({}) {
    try {
      const params = {
        TableName: TableName,
        KeyConditionExpression: "",
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
      const BODY_PEOPLE = new PeopleModal(body);
      const params = {
        TableName: process.env.PEOPLE_TABLE,
        Item: {
          peopleId: BODY_PEOPLE?.peopleId,
          nombre: BODY_PEOPLE?.nombre,
          altura: BODY_PEOPLE?.altura,
          masa: BODY_PEOPLE?.masa,
          color_de_pelo: BODY_PEOPLE?.color_de_pelo,
          color_de_piel: BODY_PEOPLE?.color_de_piel,
          color_de_ojos: BODY_PEOPLE?.color_de_ojos,
          año_de_nacimiento: BODY_PEOPLE?.año_de_nacimiento,
          genero: BODY_PEOPLE?.genero,
          mundo_natal: BODY_PEOPLE?.mundo_natal,
          peliculas: BODY_PEOPLE?.peliculas,
          especies: BODY_PEOPLE?.especies,
          vehiculos: BODY_PEOPLE?.vehiculos,
          naves_estelares: BODY_PEOPLE?.naves_estelares,
          creado: BODY_PEOPLE?.creado,
          editado: BODY_PEOPLE?.editado,
          vinculo: BODY_PEOPLE?.vinculo,
        },
      };

      return DYNAMO_DB_CLIENT.send(new PutCommand(params));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { PeopleModal };
