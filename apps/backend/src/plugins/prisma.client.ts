import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

export async function prismaPlugin(server: FastifyInstance) {
  // Prisma-Client erzeugen
  const prisma = new PrismaClient();

  // Prisma-Client in server.decorate speichern
  server.decorate("prisma", prisma);

  // Prisma beenden, wenn Server stoppt
  server.addHook("onClose", async (server) => {
    await server.prisma.$disconnect();
  });
}
