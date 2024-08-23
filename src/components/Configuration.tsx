'use client';

import { useEffect, useState } from 'react';
import { KeyConfig } from '@/types';
import Key from './Key';
import InputLabel from './InputLabel';
import Button from './Button';
import GroupOptions from './GroupOptions';
import Option from './Option';
import useKBStore from '@/store';

interface KeyData {
  code: string,
  key: string
}

export default function Configuration() {
  // TODO Caps Lock
  const keyboardConfig = useKBStore((s) => s.keyboardConfig);
  const setKeyConfig = useKBStore((s) => s.setKeyConfig);
  const removeKeyConfig = useKBStore((s) => s.removeKeyConfig);

  const [keyData, setKeyData] = useState<null | KeyData>(null);
  const [value, setValue] = useState<string>('');
  const [alts, setAlts] = useState<{
    value: boolean, shift: boolean }>({ value: false, shift: false });
  const [shiftValue, setShiftValue] = useState<string>('');
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
    setKeyData({ code: evt.code, key: evt.key });
    if (evt.code in keyboardConfig) {
      setValue(keyboardConfig[evt.code].value);
      setShiftValue(keyboardConfig[evt.code].shiftValue || '');
      setAlts({
        value: true,
        shift: typeof keyboardConfig[evt.code].shiftValue === 'string',
      });
    } else {
      setValue('');
      setShiftValue('');
      setAlts({ value: false, shift: false });
    }
  };
  const handleUpdateKeyConfig = () => {
    if (keyData) {
      if (!alts.value) {
        removeKeyConfig(keyData.code);
        return;
      }
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
    <section className="flex max-sm:flex-col w-full border-[.1em] border-slate-600 rounded-md overflow-hidden">
      <div
        className="flex-1 flex flex-col gap-1 justify-center items-center p-4 bg-slate-900 sm:border-r-[.1em] max-sm:border-b-[.1em] border-slate-600 focus:bg-slate-800 outline-none"
        role="textbox"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <Key keyStr={keyData ? keyData.key : '?'} />
        <span className="px-2 text-sm bg-slate-600 rounded-md">
          {keyData ? keyData.code : 'No key'}
        </span>
      </div>
      <div className="flex-1 min-w-[28em] max-sm:min-w-full p-4">
        <GroupOptions>
          <Option
            state={alts.value}
            onClick={() => {
              if (!keyData) return;
              if (alts.value) {
                setAlts({ shift: false, value: false });
                setShiftValue('');
              } else {
                setAlts((a) => ({ ...a, value: !a.value }));
              }
              setValue('');
            }}
          >
            Value
          </Option>
          <Option
            state={alts.shift}
            onClick={() => {
              if (alts.value) {
                setAlts((a) => ({ ...a, shift: !a.shift }));
                setShiftValue('');
              }
            }}
          >
            Shift Value
          </Option>
        </GroupOptions>
        <InputLabel
          label="Value"
          id="value"
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
          disabled={!alts.value}
        />
        <InputLabel
          label="Shift Value"
          id="shift-value"
          value={shiftValue}
          onChange={(evt) => setShiftValue(evt.target.value)}
          disabled={!alts.shift}
        />
        <Button
          onClick={handleUpdateKeyConfig}
          disabled={!keyData}
        >
          Update
        </Button>
      </div>
    </section>
  );
}
