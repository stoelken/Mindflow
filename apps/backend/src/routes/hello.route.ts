import { FastifyInstance } from "fastify";

export async function helloRoutes(server: FastifyInstance) {
  server.get("/api/hello", async () => {
    return { message: "Hello from backend!" };
  });
}