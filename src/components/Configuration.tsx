'use client';

import { useEffect, useState } from 'react';
import { KeyboardConfig, KeyConfig } from '@/types';

interface Props {
  keyboardConfig: KeyboardConfig,
  setKeyConfig: (keyCode: string, keyConfig: KeyConfig) => void
}

interface KeyData {
  code: string
}

export default function Configuration({ keyboardConfig, setKeyConfig }: Props) {
  // TODO Caps Lock
  const [keyData, setKeyData] = useState<null | KeyData>(null);
  const [value, setValue] = useState<string>('');
  const [alts, setAlts] = useState<{ shift: boolean }>({ shift: false });
  const [shiftValue, setShiftValue] = useState<string>('');
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
    setKeyData({ code: evt.code });
    if (evt.code in keyboardConfig) {
      setValue(keyboardConfig[evt.code].value);
      setShiftValue(keyboardConfig[evt.code].shiftValue || '');
    } else {
      setValue('');
      setShiftValue('');
    }
  };
  const handleUpdateKeyConfig = () => {
    if (keyData) {
      const keyConfig: KeyConfig = {
        value,
      };
      if (alts.shift) {
        keyConfig.shiftValue = shiftValue;
      }
      setKeyConfig(keyData.code, keyConfig);
    }
  };
  useEffect(() => {
    console.log(keyboardConfig);
  }, [keyboardConfig]);
  return (
    <section className="flex w-full bg-slate-800">
      <div
        className="flex-1 flex justify-center items-center p-4 bg-slate-600"
        role="presentation"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <p>{ keyData ? keyData.code : 'No key'}</p>
      </div>
      <div className="flex-1 p-4">
        <input
          type="text"
          className="mb-2 w-full px-2 py-1 border-2 border-slate-200 rounded-sm"
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
          disabled={!keyData}
        />
        <div>
          <button
            type="button"
            className="px-2 font-semibold text-slate-950 bg-slate-200 rounded-sm"
            onClick={() => setAlts((a) => ({ ...a, shift: !a.shift }))}
          >
            Shift Value
          </button>
          {alts.shift
          && (
          <input
            type="text"
            className="mb-2 w-full px-2 py-1 border-2 border-slate-200 rounded-sm"
            value={shiftValue}
            onChange={(evt) => setShiftValue(evt.target.value)}
          />
          )}
        </div>
        <button
          type="button"
          className="px-2 font-semibold text-slate-950 bg-slate-200 rounded-sm"
          onClick={handleUpdateKeyConfig}
        >
          Set Value
        </button>
      </div>
    </section>
  );
}
