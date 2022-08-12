import { setupAppTest } from "../tests/builder";
import { createApp } from "./app";

const test = setupAppTest(createApp);

test("must success", async (t) => {
  let a = 1;
  a += 1;
  const b = 2;

  t.context.app.log.info('logging on ava success');
  t.assert(a === b);
});
