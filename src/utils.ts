import { KeyboardConfig, KeyConfig } from './types';

export function debounce(func: () => void, timeout: number) {
  let timeId: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeId);
    timeId = setTimeout(func, timeout);
  };
}

function isObject(value: unknown): value is object {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

function isKeyConfig(obj: object): obj is KeyConfig {
  const l = Object.keys(obj).length;
  return 'value' in obj && isString(obj.value)
    && (l === 1 || ('shiftValue' in obj && isString(obj.shiftValue) && l === 2));
}

export function parseKeyboardConfig(obj: unknown): KeyboardConfig {
  if (!isObject(obj)) {
    throw new Error();
  }
  Object.values(obj).forEach((value) => {
    if (!isObject(value) || !isKeyConfig(value)) {
      throw new Error();
    }
  });
  return obj as KeyboardConfig;
}
