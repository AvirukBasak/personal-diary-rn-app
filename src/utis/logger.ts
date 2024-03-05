export function log(message: string, ...args: any[]) {
  console.log(`${message}`, ...args);
}

export function warn(message: string, ...args: any[]) {
  console.warn(`${message}`, ...args);
}

export function error(message: string, ...args: any[]) {
  console.error(`${message}`, ...args);
}

export default {
  log,
  warn,
  error,
};
