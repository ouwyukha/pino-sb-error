import type { FastifyReply, FastifyRequest } from "fastify";
import { createApp } from "./app";
import createLogger from "./logger";

const logger = createLogger();

async function init() {
  const app = await createApp(logger);

  try {
    app.get("/", (_: FastifyRequest, rep: FastifyReply) => {
      app.log.info("hello world");
      rep.send('hello world');
    });
    await app.listen({
      port: 3001,
      host: "0.0.0.0",
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

init();
