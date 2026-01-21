const teamScoresCollection = {
  name: "team_scores",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["team_id", "total_score"],
      properties: {
        team_id: {
          bsonType: "objectId",
          description: "Foreign key reference to teams collection (also PK)",
        },
        total_score: {
          bsonType: "int",
          minimum: 0,
          description: "Total accumulated score for the team",
        },
      },
    },
  },
  indexes: [{ key: { team_id: 1 }, options: { unique: true } }],
};

module.exports = teamScoresCollection;
