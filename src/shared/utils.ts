export type PickRequired<T, K extends keyof T> = {
  [P in K]-?: Exclude<T[P], null | undefined | void>;
};

export function isNonEmptyString(input: unknown): input is string {
  return typeof input === 'string' && input.trim() !== '';
}

export function coerceToArray<T>(input: T | T[]): T[] {
  return Array.isArray(input) ? input : [input];
}
