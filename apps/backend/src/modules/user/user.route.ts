import { FastifyInstance } from "fastify";

export async function userRoutes(server: FastifyInstance) {
  // Alle User abrufen
  server.get("/users", async () => {
    return server.prisma.user.findMany();
  });

  // Neuen User erstellen
  server.post("/users", async (request, reply) => {
    const { name, email } = request.body as { name: string; email: string };
    try {
      const user = await server.prisma.user.create({
        data: { name, email },
      });
      reply.code(201).send(user);
    } catch (err) {
      reply.code(400).send({ error: "User konnte nicht erstellt werden" });
    }
  });
}
