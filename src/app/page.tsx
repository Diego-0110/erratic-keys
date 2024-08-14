'use client';

import { useState } from 'react';
import Configuration from '@/components/Configuration';
import KeyboardAndInput from '@/components/KeyboardAndInput';
import { KeyboardConfig, KeyConfig } from '@/types';
import KeyConfigCard from '@/components/KeyConfigCard';
import { DoubleArrowIcon, SettingsIcon } from '@/components/icons';

export default function Home() {
  const [keyboardConfig, setKeyboardConfig] = useState<KeyboardConfig>({});
  const setKeyConfig = (keyCode: string, keyConfig: KeyConfig) => {
    setKeyboardConfig({ ...keyboardConfig, [keyCode]: keyConfig });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 font-mono text-slate-200 bg-slate-950">
      <KeyboardAndInput keyboardConfig={keyboardConfig} />
      <div className="bg-slate-900 fixed overflow-auto scrollbar bottom-0 left-0 right-0 max-h-[50vh] px-2 pt-10 pb-3 rounded-t-lg border-t-[.1em] border-x-[.1em] border-slate-600">
        <div className="absolute top-2 right-0 flex justify-center gap-1 w-full">
          <SettingsIcon className="w-5" />
          <DoubleArrowIcon className="w-5" />
        </div>
        <div className="flex flex-col gap-2 max-w-4xl m-auto">
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
