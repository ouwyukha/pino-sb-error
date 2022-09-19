import fastify, { FastifyInstance } from "fastify";
import createLogger from "./logger";

export const createApp = async (): Promise<FastifyInstance> => {
  const app = fastify({
    logger: createLogger(),
  });
  return app;
};
