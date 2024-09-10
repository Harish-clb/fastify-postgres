import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { PrismaClient } from "@prisma/client";

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export const prismaPlugin: FastifyPluginAsync = fp(async (fastify: FastifyInstance) => {
  const prisma = new PrismaClient();

  // Attach prisma to the Fastify instance
  fastify.decorate("prisma", prisma);

  // Ensure Prisma is properly disconnected during shutdown
  fastify.addHook("onClose", async (fastifyInstance) => {
    await fastifyInstance.prisma.$disconnect();
  });
});
