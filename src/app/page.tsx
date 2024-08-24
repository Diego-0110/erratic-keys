'use client';

import KeyboardAndInput from '@/components/input/KeyboardAndInput';
import ConfigurationDrawer from '@/components/configuration/ConfigurationDrawer';

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-between p-4 font-mono text-slate-200 bg-slate-950">
      <KeyboardAndInput />
      <ConfigurationDrawer />
    </main>
  );
}
