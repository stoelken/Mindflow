import dotenv from "dotenv";
import { buildApp } from "./app.js";
import { PrismaClient } from "@prisma/client";
import formbody from "@fastify/formbody";
import cors from "@fastify/cors";
import { FastifyReply, FastifyRequest } from "fastify";

dotenv.config();

const prisma = new PrismaClient();
const app = buildApp();
const port = Number(process.env.PORT) || 4000;

app.register(formbody);
app.register(cors);
app.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (req: FastifyRequest, body: string, done: (err: Error | null, value?: unknown) => void) => {
    try {
      const json = JSON.parse(body);
      done(null, json);
    } catch (err) {
      done(err as Error, undefined);
    }
  }
);

app.get("/api/users", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.error("Error fetching users:", err);
    reply.status(500).send({ error: "Failed to fetch users", details: err instanceof Error ? err.message : String(err) });
  }
});

type CreateUserBody = { email: string; name: string };

app.post("/api/users", async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { email, name } = request.body as CreateUserBody;
    const newUser = await prisma.user.create({
      data: { email, name },
    });
    return newUser;
  } catch (err) {
    console.error("Error creating user:", err);
    reply.status(500).send({ error: "Failed to create user", details: err instanceof Error ? err.message : String(err) });
  }
});

app.listen({ port }, (err: Error | null, address?: string) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
  // Print all registered routes to help debugging
  app.ready().then(() => {
    try {
      console.log(app.printRoutes());
    } catch (e) {
      console.log("Could not print routes", e);
    }
  });
});
