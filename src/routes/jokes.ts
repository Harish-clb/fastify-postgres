import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyRegisterOptions,
} from "fastify";
import { allJokes, singleJoke } from "../schemas/jokes";
import { GetJokeRequest } from "../models/jokes";

type Options = {
  prefix: string;
};

export const jokeRoutes = (
  fastify: FastifyInstance,
  options: FastifyRegisterOptions<Options>,
  done: Function
) => {
  fastify.get(
    "/",
    {
      schema: allJokes,
    },
    async (_, reply: FastifyReply) => {
      try {
        const jokes = await fastify.prisma.joke.findMany();
        reply.code(200).send(jokes);
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ message: "Something went wrong" });
      }
    }
  );

  fastify.get(
    "/:id",
    {
      schema: singleJoke,
    },
    async (
      request: FastifyRequest<{ Params: GetJokeRequest }>,
      reply: FastifyReply
    ) => {
      try {
        const { id } = request.params;
        if (!id) {
          reply.code(400).send({ message: "Joke id is required" });
        }
        const joke = await fastify.prisma.joke.findUnique({
          where: {
            id: Number(id),
          },
        });
        if (!joke) {
          reply.code(404).send({ message: `Joke id ::: ${id} not found` });
        }
        reply.code(200).send(joke);
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ message: "Something went wrong" });
      }
    }
  );

  done();
};
