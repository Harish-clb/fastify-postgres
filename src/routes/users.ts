import {
  FastifyInstance,
  FastifyRegisterOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { allUsers, singleUser } from "../schemas/users";
import { GetUserRequest } from "../models/users";

type Options = {
  prefix: string;
};

export const userRoutes = (
  fastify: FastifyInstance,
  options: FastifyRegisterOptions<Options>,
  done: Function
) => {
  fastify.get(
    "/",
    {
      schema: allUsers,
    },
    async (_, reply: FastifyReply) => {
      try {
        const users = await fastify.prisma.user.findMany();
        reply.code(200).send(users);
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ message: "Something went wrong" });
      }
    }
  );

  fastify.get(
    "/:id",
    {
      schema: singleUser,
    },
    async (
      request: FastifyRequest<{ Params: GetUserRequest }>,
      reply: FastifyReply
    ) => {
      try {
        const { id } = request.params;
        if (!id) {
          reply.code(400).send({ message: "User id is required" });
        }
        const user = await fastify.prisma.user.findUnique({
          where: {
            id: Number(id),
          },
          select: {
            email: true,
            name: true,
          },
        });
        if (!user) {
          reply.code(404).send({ message: `User id ::: ${id} not found` });
        }
        reply.code(200).send(user);
      } catch (error) {
        reply.code(500).send({ message: "Something went wrong" });
      }
    }
  );

  done();
};
