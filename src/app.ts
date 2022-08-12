import fastify, { FastifyInstance } from "fastify";
import type { Logger } from "pino";

export const createApp = async (logger: Logger): Promise<FastifyInstance> => {
  const app = fastify({
    logger,
  });
  return app;
};
