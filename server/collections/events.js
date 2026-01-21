const eventsCollection = {
  name: "events",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["event_name", "event_type", "max_participants", "created_by"],
      properties: {
        event_name: {
          bsonType: "string",
          description: "Event name is required and must be unique",
        },
        event_type: {
          enum: ["SOLO", "DUET", "GROUP"],
          description: "Event type must be SOLO, DUET, or GROUP",
        },
        max_participants: {
          bsonType: "int",
          minimum: 1,
          description: "Maximum participants is required",
        },
        created_by: {
          bsonType: "objectId",
          description: "Foreign key reference to users collection",
        },
      },
    },
  },
  indexes: [
    { key: { event_name: 1 }, options: { unique: true } },
    { key: { created_by: 1 }, options: {} },
  ],
};

module.exports = eventsCollection;
