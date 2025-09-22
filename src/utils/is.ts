export const isNil = (value: unknown): value is null | undefined => value === null || value === undefined;

export const isArray = <T = unknown>(value: unknown): value is T[] => Array.isArray(value);

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object';
