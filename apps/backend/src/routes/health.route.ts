import { FastifyInstance } from "fastify";

export async function healthRoutes(server: FastifyInstance) {
  server.get("/health", async () => {
    return {
      status: "ok",
      uptime: process.uptime(),
    };
  });
}