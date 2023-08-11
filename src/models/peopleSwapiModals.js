const swapi = require("swapi-node");
const { CustomErrorSwapiApi } = require("../helpers/customErrorSwapi");

class PeopleSwapiModal {
  constructor(entity) {
    this.nombre = entity.name;
    this.altura = entity.height;
    this.masa = entity.mass;
    this.color_de_pelo = entity.hair_color;
    this.color_de_piel = entity.skin_color;
    this.color_de_ojos = entity.eye_color;
    this.anio_de_nacimiento = entity.birth_year;
    this.genero = entity.gender;
    this.mundo_natal = entity.homeworld;
    this.peliculas = entity.films;
    this.vehiculos = entity.vehicles;
    this.naves_estelares = entity.starships;
    this.creado = entity.created;
    this.editado = entity.edited;
    this.vinculo = entity.url;
  }

  static async getAll({}) {
    try {
      const PEOPLE_SWAPI_ALL = await swapi.people();
      return PEOPLE_SWAPI_ALL.results.map((p) => new PeopleSwapiModal(p));
    } catch (error) {
      throw new CustomErrorSwapiApi(error?.message);
    }
  }

  static async getById({ peopleId }) {
    try {
      const PEOPLE_SWAPI = await swapi.people({ id: peopleId });
      return new PeopleSwapiModal(PEOPLE_SWAPI);
    } catch (error) {
      throw new CustomErrorSwapiApi(error?.message);
    }
  }
}

module.exports = { PeopleSwapiModal };
