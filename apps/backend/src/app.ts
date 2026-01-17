import Fastify from "fastify";
import { helloRoutes } from "./routes/hello.route.js";
import { healthRoutes } from "./routes/health.route.js";
import { prismaPlugin } from "./plugins/prisma.client.js";
import { userRoutes } from "./modules/user/user.route.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  // Routen registrieren
  app.register(helloRoutes);
  app.register(healthRoutes);
  app.register(prismaPlugin);
  app.register(userRoutes);

  return app;
}