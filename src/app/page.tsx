'use client';

import KeyboardAndInput from '@/components/KeyboardAndInput';
import ConfigurationDrawer from '@/components/ConfigurationDrawer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 font-mono text-slate-200 bg-slate-950">
      <KeyboardAndInput />
      <ConfigurationDrawer />
    </main>
  );
}
