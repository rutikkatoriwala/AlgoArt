const teamsCollection = {
  name: "teams",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["team_name", "owner_id"],
      properties: {
        team_name: {
          bsonType: "string",
          description: "Team name is required and must be unique",
        },
        owner_id: {
          bsonType: "objectId",
          description: "Foreign key reference to users collection",
        },
        icon_player_id: {
          bsonType: ["objectId", "null"],
          description: "Foreign key reference to users collection (optional)",
        },
      },
    },
  },
  indexes: [
    { key: { team_name: 1 }, options: { unique: true } },
    { key: { owner_id: 1 }, options: {} },
    { key: { icon_player_id: 1 }, options: {} },
  ],
};

module.exports = teamsCollection;
