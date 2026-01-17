import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("PORT:", process.env.PORT);

import { buildApp } from "./app.js";
console.log("buildApp imported");

try {
  const app = buildApp();
  console.log("App built");
  
  const port = Number(process.env.PORT) || 4000;
  console.log("Port:", port);
  
  app.listen({ port }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log(`Server running at ${address}`);
  });
} catch (err) {
  console.error("Error:", err);
  process.exit(1);
}