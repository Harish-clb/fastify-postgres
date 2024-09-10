const serverError = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

const joke = {
  type: "object",
  properties: {
    id: { type: "number" },
    joke: { type: "string" },
    likes: { type: "number" },
    dislikes: { type: "number" },
    author: { type: "string" },
  },
};

export const singleJoke = {
  description: "Get a single joke",
  tags: ["jokes"],
  params: {
    type: "object",
    properties: {
      id: { type: "integer" },
    },
    required: ["id"],
  },
  response: {
    200: joke,
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    500: serverError,
  },
};

export const allJokes = {
  description: "Get all jokes",
  tags: ["jokes"],
  response: {
    200: {
      type: "array",
      items: joke,
    },
    500: serverError,
  },
};
