const rolesCollection = {
  name: "roles",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["role_name"],
      properties: {
        role_name: {
          bsonType: "string",
          description: "Role name is required and must be unique",
        },
      },
    },
  },
  indexes: [{ key: { role_name: 1 }, options: { unique: true } }],
};

module.exports = rolesCollection;
