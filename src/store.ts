import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { Config, KeyboardConfig, KeyConfig } from './types';

interface KBConfigSlice {
  keyboardConfig: KeyboardConfig,
  setKBConfig: (newKBConfig: KeyboardConfig) => void,
  setKeyConfig: (keyCode: string, keyConfig: KeyConfig) => void,
  removeKeyConfig: (keyCode: string) => void
  resetKBConfig: () => void
}

const createKBConfigSlice: StateCreator<
KBConfigSlice, [], [],
KBConfigSlice
> = (set, get) => ({
  keyboardConfig: {},
  setKBConfig: (newKBConfig) => set({ keyboardConfig: newKBConfig }),
  setKeyConfig: (keyCode, keyConfig) => set((s) => ({
    keyboardConfig: { ...s.keyboardConfig, [keyCode]: keyConfig },
  })),
  removeKeyConfig: (keyCode) => {
    const newKBConfig = { ...get().keyboardConfig };
    delete newKBConfig[keyCode];
    set({ keyboardConfig: newKBConfig });
  },
  resetKBConfig: () => set({ keyboardConfig: {} }),
});

interface ConfigSlice {
  config: Config,
  toggleSwap: () => void
}

const createConfigSlice: StateCreator<
ConfigSlice, [], [], ConfigSlice
> = (set) => ({
  config: { replace: true },
  toggleSwap: () => set((s) => ({ config: { ...s.config, replace: !s.config.replace } })),
});

const useKBStore = create<KBConfigSlice & ConfigSlice>()(persist((...a) => ({
  ...createKBConfigSlice(...a),
  ...createConfigSlice(...a),
}), {
  name: 'erratic-keys',
}));

export default useKBStore;
