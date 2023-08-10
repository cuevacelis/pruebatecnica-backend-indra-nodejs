const PEOPLE_SERVICE = require("../services/peopleService");

module.exports = {
  async getPeople(event) {
    if (event.pathParameters?.id) {
      return PEOPLE_SERVICE.getByIdPeopleService(event);
    } else {
      return PEOPLE_SERVICE.getAllPeoplesService(event);
    }
  },
  async createPeople(event) {
    return PEOPLE_SERVICE.createPeopleService(event);
  },
};
