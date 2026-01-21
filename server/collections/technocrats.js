const technocratsCollection = {
  name: "technocrats",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "enrollment_no"],
      properties: {
        user_id: {
          bsonType: "objectId",
          description: "Foreign key reference to users collection",
        },
        enrollment_no: {
          bsonType: "string",
          description: "Enrollment number is required and must be unique",
        },
        team_id: {
          bsonType: ["objectId", "null"],
          description: "Foreign key reference to teams collection (optional)",
        },
      },
    },
  },
  indexes: [
    { key: { enrollment_no: 1 }, options: { unique: true } },
    { key: { user_id: 1 }, options: {} },
    { key: { team_id: 1 }, options: {} },
  ],
};

module.exports = technocratsCollection;
