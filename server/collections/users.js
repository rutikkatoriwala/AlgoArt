const usersCollection = {
  name: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password_hash", "role_id", "created_at"],
      properties: {
        name: {
          bsonType: "string",
          description: "User name is required",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Email is required and must be valid",
        },
        password_hash: {
          bsonType: "string",
          description: "Password hash is required",
        },
        role_id: {
          bsonType: "objectId",
          description: "Foreign key reference to roles collection",
        },
        created_at: {
          bsonType: "date",
          description: "Timestamp when user was created",
        },
      },
    },
  },
  indexes: [
    { key: { email: 1 }, options: { unique: true } },
    { key: { role_id: 1 }, options: {} },
  ],
};

module.exports = usersCollection;
