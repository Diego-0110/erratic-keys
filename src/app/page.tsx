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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <KeyboardAndInput keyboardConfig={keyboardConfig} />
      <Configuration keyboardConfig={keyboardConfig} setKeyConfig={setKeyConfig} />
    </main>
  );
}
