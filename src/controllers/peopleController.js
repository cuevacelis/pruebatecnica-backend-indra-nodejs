const PEOPLE_SERVICE = require("../services/peopleService");

module.exports = {
  async getPeople(eventLambda) {
    if (eventLambda.pathParameters?.id) {
      return PEOPLE_SERVICE.getByIdPeopleService(eventLambda);
    } else {
      return PEOPLE_SERVICE.getAllPeoplesService(eventLambda);
    }
  },
  async createPeople(eventLambda) {
    return PEOPLE_SERVICE.createPeopleService(eventLambda);
  },
  async updatePeople(eventLambda) {
    return PEOPLE_SERVICE.updatePeopleService(eventLambda);
  },
  async deletePeople(eventLambda) {
    return PEOPLE_SERVICE.deletePeopleService(eventLambda);
  },
};
