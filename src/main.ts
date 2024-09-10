import { PrismaClient } from "@prisma/client";
import Fastify, { FastifyInstance, FastifyRegisterOptions } from "fastify";

import { prismaPlugin } from "../prisma/prisma.plugin";
import { ROUTES_PREFIX } from "./CONSTANTS";
import { userRoutes } from "./routes/users";
import { jokeRoutes } from "./routes/jokes";
import { errorHandler } from "./http/errors/errorHandler";

const prisma = new PrismaClient();

const fastify: FastifyInstance = Fastify({
  logger: true,
});

fastify.register(prismaPlugin);

function registerRoutes() {
  fastify.register(jokeRoutes, { prefix: ROUTES_PREFIX.JOKE });
  fastify.register(userRoutes, { prefix: ROUTES_PREFIX.USER });
}

// Register swagger and routes
(async function () {
  await fastify.register(import("@fastify/swagger"), {
    openapi: {
      openapi: "3.0.3",
      info: {
        title: "Fastify Postgres Starter",
        description: "Fastify Postgres Starter API Documentation",
        version: "0.1.0",
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: "Development server",
        },
      ],
      tags: [
        {
          name: "jokes",
          description: "Jokes related endpoints",
        },
        {
          name: "users",
          description: "Users related endpoints",
        },
      ],
    },
  });

  // Health check
  fastify.get(
    "/",
    {
      schema: {
        description: "Health check",
        tags: ["health"],
        response: {
          200: {
            type: "string",
          },
        },
      },
    },
    async () => {
      return "Hello from Fastify !!!";
    }
  );

  registerRoutes();

  await fastify.register(import("@fastify/swagger-ui"), {
    routePrefix: "/docs",
  });

  await fastify.ready();
  fastify.swagger();
})();

fastify.setErrorHandler(errorHandler);

const start = async () => {
  try {
    await fastify.listen({
      port: 5000,
      // host: "0.0.0.0", // Used to locally access the server because in MAC port forwarding didn't work
    });
    fastify.log.info(`Server is up and running`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
