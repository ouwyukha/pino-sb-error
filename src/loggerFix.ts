import pino from 'pino';

const createLogger = (): pino.Logger => {
  const logger = pino(
    {
      level: 'info',
    },
    pino.destination({
      sync: false,
      fd: 1,
    }),
  );

  return logger;
};

export default createLogger;
