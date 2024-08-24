export interface KeyConfig {
  value: string,
  shiftValue?: string
}

export type KeyboardConfig = Record<string, KeyConfig>;

export interface Config {
  replace: boolean
}
