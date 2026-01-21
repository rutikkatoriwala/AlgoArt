const eventPointsCollection = {
  name: "event_points",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "event_id",
        "first_place_points",
        "second_place_points",
        "third_place_points",
      ],
      properties: {
        event_id: {
          bsonType: "objectId",
          description: "Foreign key reference to events collection (also PK)",
        },
        first_place_points: {
          bsonType: "int",
          minimum: 0,
          description: "Points for first place",
        },
        second_place_points: {
          bsonType: "int",
          minimum: 0,
          description: "Points for second place",
        },
        third_place_points: {
          bsonType: "int",
          minimum: 0,
          description: "Points for third place",
        },
      },
    },
  },
  indexes: [{ key: { event_id: 1 }, options: { unique: true } }],
};

module.exports = eventPointsCollection;
