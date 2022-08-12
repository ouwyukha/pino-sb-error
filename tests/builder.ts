import _test, { TestFn } from "ava";
import type { Logger } from "pino";
import type { FastifyInstance } from "fastify";
import createLogger from "../src/logger";

const testApp = _test as TestFn<{ app: FastifyInstance }>;

export const setupAppTest = (
  createApp: (logger: Logger) => Promise<FastifyInstance>
): TestFn<{ app: FastifyInstance }> => {
  process.env.NODE_ENV = "test";
  const logger = createLogger();

  testApp.beforeEach("be", async (t) => {
    t.context.app = await createApp(logger);
    await t.context.app.ready();
  });

  testApp.afterEach("ae", async (t) => {
    await t.context.app.close();
  });

  return testApp;
};
