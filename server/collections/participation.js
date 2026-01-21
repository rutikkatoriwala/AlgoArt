const participationCollection = {
  name: "participation",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["technocrat_id", "event_id"],
      properties: {
        technocrat_id: {
          bsonType: "objectId",
          description: "Foreign key reference to technocrats collection",
        },
        event_id: {
          bsonType: "objectId",
          description: "Foreign key reference to events collection",
        },
      },
    },
  },
  indexes: [
    { key: { technocrat_id: 1, event_id: 1 }, options: { unique: true } },
    { key: { technocrat_id: 1 }, options: {} },
    { key: { event_id: 1 }, options: {} },
  ],
};

module.exports = participationCollection;
