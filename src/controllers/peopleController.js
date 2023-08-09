const PEOPLE_SERVICE = require("../services/peopleService");

module.exports = {
  async getPeople(event) {
    return PEOPLE_SERVICE().getPeople(event);
  },
  async createPeople(event) {
    return PEOPLE_SERVICE().createPeople(event);
  },
};
