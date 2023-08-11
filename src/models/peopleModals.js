const {
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
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
    this.anio_de_nacimiento = entity.anio_de_nacimiento;
    this.genero = entity.genero;
    this.mundo_natal = entity.mundo_natal;
    this.peliculas = entity.peliculas;
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
          anio_de_nacimiento: BODY_PEOPLE?.anio_de_nacimiento,
          genero: BODY_PEOPLE?.genero,
          mundo_natal: BODY_PEOPLE?.mundo_natal,
          peliculas: BODY_PEOPLE?.peliculas,
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

  static async updateById({ peopleId, body }) {
    const BODY_PEOPLE_CURRENT_DATA = await this.getById({ peopleId });
    console.log(BODY_PEOPLE_CURRENT_DATA);
    const BODY_PEOPLE_NEW_DATA = new PeopleModal(body);
    try {
      const params = {
        TableName: TableName,
        Key: {
          peopleId: peopleId,
        },
        UpdateExpression:
          "set nombre = :nombre, altura = :altura, masa = :masa, color_de_pelo = :color_de_pelo, color_de_piel = :color_de_piel, color_de_ojos = :color_de_ojos, anio_de_nacimiento = :anio_de_nacimiento, genero = :genero, mundo_natal = :mundo_natal, peliculas = :peliculas, vehiculos = :vehiculos, naves_estelares = :naves_estelares, creado = :creado, editado = :editado, vinculo = :vinculo",
        ExpressionAttributeValues: {
          ":nombre":
            BODY_PEOPLE_NEW_DATA?.nombre ??
            BODY_PEOPLE_CURRENT_DATA.Item?.nombre,
          ":altura":
            BODY_PEOPLE_NEW_DATA?.altura ??
            BODY_PEOPLE_CURRENT_DATA.Item?.altura,
          ":masa":
            BODY_PEOPLE_NEW_DATA?.masa ?? BODY_PEOPLE_CURRENT_DATA.Item?.masa,
          ":color_de_pelo":
            BODY_PEOPLE_NEW_DATA?.color_de_pelo ??
            BODY_PEOPLE_CURRENT_DATA.Item?.color_de_pelo,
          ":color_de_piel":
            BODY_PEOPLE_NEW_DATA?.color_de_piel ??
            BODY_PEOPLE_CURRENT_DATA.Item?.color_de_piel,
          ":color_de_ojos":
            BODY_PEOPLE_NEW_DATA?.color_de_ojos ??
            BODY_PEOPLE_CURRENT_DATA.Item?.color_de_ojos,
          ":anio_de_nacimiento":
            BODY_PEOPLE_NEW_DATA?.anio_de_nacimiento ??
            BODY_PEOPLE_CURRENT_DATA.Item?.anio_de_nacimiento,
          ":genero":
            BODY_PEOPLE_NEW_DATA?.genero ??
            BODY_PEOPLE_CURRENT_DATA.Item?.genero,
          ":mundo_natal":
            BODY_PEOPLE_NEW_DATA?.mundo_natal ??
            BODY_PEOPLE_CURRENT_DATA.Item?.mundo_natal,
          ":peliculas":
            BODY_PEOPLE_NEW_DATA?.peliculas ??
            BODY_PEOPLE_CURRENT_DATA.Item?.peliculas,
          ":vehiculos":
            BODY_PEOPLE_NEW_DATA?.vehiculos ??
            BODY_PEOPLE_CURRENT_DATA.Item?.vehiculos,
          ":naves_estelares":
            BODY_PEOPLE_NEW_DATA?.naves_estelares ??
            BODY_PEOPLE_CURRENT_DATA.Item?.naves_estelares,
          ":creado":
            BODY_PEOPLE_NEW_DATA?.creado ??
            BODY_PEOPLE_CURRENT_DATA.Item?.creado,
          ":editado":
            BODY_PEOPLE_NEW_DATA?.editado ??
            BODY_PEOPLE_CURRENT_DATA.Item?.editado,
          ":vinculo":
            BODY_PEOPLE_NEW_DATA?.vinculo ??
            BODY_PEOPLE_CURRENT_DATA.Item?.vinculo,
        },
        ReturnValues: "ALL_NEW",
      };
      return DYNAMO_DB_CLIENT.send(new UpdateCommand(params));
    } catch (error) {
      throw error;
    }
  }

  static async deleteById({ peopleId }) {
    try {
      const params = {
        TableName: TableName,
        Key: {
          peopleId: peopleId,
        },
      };
      return DYNAMO_DB_CLIENT.send(new DeleteCommand(params));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { PeopleModal };
