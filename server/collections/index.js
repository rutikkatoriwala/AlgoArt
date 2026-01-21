const rolesCollection = require("./roles");
const usersCollection = require("./users");
const teamsCollection = require("./teams");
const technocratsCollection = require("./technocrats");
const eventsCollection = require("./events");
const eventPointsCollection = require("./eventPoints");
const participationCollection = require("./participation");
const eventResultsCollection = require("./eventResults");
const teamScoresCollection = require("./teamScores");

const collections = [
  rolesCollection,
  usersCollection,
  teamsCollection,
  technocratsCollection,
  eventsCollection,
  eventPointsCollection,
  participationCollection,
  eventResultsCollection,
  teamScoresCollection,
];

module.exports = {
  collections,
  rolesCollection,
  usersCollection,
  teamsCollection,
  technocratsCollection,
  eventsCollection,
  eventPointsCollection,
  participationCollection,
  eventResultsCollection,
  teamScoresCollection,
};
