import type { FastifyReply, FastifyRequest } from "fastify";
import { cpus } from "os";
import cluster from "cluster";
import { createApp } from "./app";

async function init() {
  const app = await createApp();

  try {
    app.get("/", (_: FastifyRequest, rep: FastifyReply) => {
      for (let i = 0; i < 100000; ++i) {
        app.log.info(
          {
            i,
            flagA: "flagAIsAtomic",
            flagB: "flagBIsAtomic",
            flagC: "flagCIsAtomic",
            flagD: "flagDIsAtomic",
            flagE: "flagEIsAtomic",
          },
          "hello world"
        );
      }
      rep.send("hello world");
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

if (cluster.isPrimary) {
  const numCPUs = cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  init();
}
