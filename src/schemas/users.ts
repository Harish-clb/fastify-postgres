const serverError = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

const user = {
  id: { type: "number" },
  email: { type: "string" },
  name: { type: "string" },
};

export const singleUser = {
  description: "Get a single user",
  tags: ["users"],
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
  response: {
    200: {
      email: { type: "string" },
      name: { type: "string" },
    },
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    500: serverError,
  },
};

export const allUsers = {
  description: "Get all users",
  tags: ["users"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: user,
      },
    },
    500: serverError,
  },
};
