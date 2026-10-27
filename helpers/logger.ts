type Level = 'debug' | 'info' | 'warn' | 'error';

function log(level: Level, message: string, ...args: unknown[]) {
  if (!__DEV__ && level === 'debug') return;
  // Тут підключається Sentry/інший сервіс для warn та error.
  console[level](`[${level}] ${message}`, ...args);
}

export const logger = {
  debug: (message: string, ...args: unknown[]) => log('debug', message, ...args),
  info: (message: string, ...args: unknown[]) => log('info', message, ...args),
  warn: (message: string, ...args: unknown[]) => log('warn', message, ...args),
  error: (message: string, ...args: unknown[]) => log('error', message, ...args),
};
