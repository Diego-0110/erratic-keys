'use client';

import { useState } from 'react';
import Configuration from '@/components/Configuration';
import KeyboardAndInput from '@/components/KeyboardAndInput';
import { KeyboardConfig, KeyConfig } from '@/types';

export default function Home() {
  const [keyboardConfig, setKeyboardConfig] = useState<KeyboardConfig>({});
  const setKeyConfig = (keyCode: string, keyConfig: KeyConfig) => {
    setKeyboardConfig({ ...keyboardConfig, [keyCode]: keyConfig });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 font-mono text-slate-200 bg-slate-950">
      <KeyboardAndInput keyboardConfig={keyboardConfig} />
      <div className="bg-slate-900 absolute bottom-0 left-0 right-0 max-h-[50vh] overflow-auto p-2 pt-8 rounded-t-lg border-t-[.1em] border-x-[.1em] border-slate-600">
        <Configuration keyboardConfig={keyboardConfig} setKeyConfig={setKeyConfig} />
      </div>
    </main>
  );
}
