export function log(message: string, ...args: any[]) {
  console.log(`[LOG] ${message}`, ...args);
}

export function warn(message: string, ...args: any[]) {
  console.warn(`[WARN] ${message}`, ...args);
}

export function error(message: string, ...args: any[]) {
  console.error(`[ERROR] ${message}`, ...args);
}

export default {
  log,
  warn,
  error,
};
