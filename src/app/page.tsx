'use client';

import { useState } from 'react';
import Configuration from '@/components/Configuration';
import KeyboardAndInput from '@/components/KeyboardAndInput';
import { KeyboardConfig, KeyConfig } from '@/types';
import KeyConfigCard from '@/components/KeyConfigCard';
import { ArrowDownIcon, SettingsIcon } from '@/components/icons';

export default function Home() {
  const [keyboardConfig, setKeyboardConfig] = useState<KeyboardConfig>({});
  const setKeyConfig = (keyCode: string, keyConfig: KeyConfig | null) => {
    if (!keyConfig) {
      const newKeyboardConfig = { ...keyboardConfig };
      delete newKeyboardConfig[keyCode];
      setKeyboardConfig(newKeyboardConfig);
    } else {
      setKeyboardConfig({ ...keyboardConfig, [keyCode]: keyConfig });
    }
  };
  const [configOpen, setConfigOpen] = useState<boolean>(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 font-mono text-slate-200 bg-slate-950">
      <KeyboardAndInput keyboardConfig={keyboardConfig} />
      <div className={`bg-slate-900 fixed overflow-auto scrollbar bottom-0 left-0 right-0 max-w-4xl m-auto max-h-[50vh] px-2 pt-10 pb-3 rounded-t-lg border-t-[.1em] border-x-[.1em] border-slate-600 transition-all${configOpen ? ' translate-y-[calc(100%-2.5em)] overflow-hidden' : ''}`}>
        <div className="absolute top-1 right-0 flex justify-center w-full">
          <button
            type="button"
            className="flex px-2 py-1 hover:bg-slate-800 rounded-md"
            onClick={() => setConfigOpen(!configOpen)}
          >
            <SettingsIcon className="w-5" />
            <ArrowDownIcon className={`w-5 transition-transform${configOpen ? ' flip-h' : ''}`} />
          </button>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-4xl m-auto">
          <Configuration keyboardConfig={keyboardConfig} setKeyConfig={setKeyConfig} />
          {Object.entries(keyboardConfig)
            .map(([keyCode, keyConfig]) => (
              <KeyConfigCard
                key={keyCode}
                keyCode={keyCode}
                keyConfig={keyConfig}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
