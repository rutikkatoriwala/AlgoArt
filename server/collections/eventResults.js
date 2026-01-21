const eventResultsCollection = {
  name: "event_results",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["event_id", "team_id", "position", "points_awarded"],
      properties: {
        event_id: {
          bsonType: "objectId",
          description: "Foreign key reference to events collection",
        },
        team_id: {
          bsonType: "objectId",
          description: "Foreign key reference to teams collection",
        },
        position: {
          bsonType: "int",
          minimum: 1,
          description: "Position/rank in the event",
        },
        points_awarded: {
          bsonType: "int",
          minimum: 0,
          description: "Points awarded for this position",
        },
      },
    },
  },
  indexes: [
    { key: { event_id: 1, team_id: 1 }, options: { unique: true } },
    { key: { event_id: 1 }, options: {} },
    { key: { team_id: 1 }, options: {} },
  ],
};

module.exports = eventResultsCollection;
