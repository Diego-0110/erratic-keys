'use client';

import { useEffect, useState } from 'react';
import { KeyboardConfig, KeyConfig } from '@/types';
import Key from './Key';
import InputLabel from './InputLabel';
import Button from './Button';
import GroupOptions from './GroupOptions';
import Option from './Option';

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
  const [alts, setAlts] = useState<{
    value: boolean, shift: boolean }>({ value: false, shift: false });
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
    <section className="flex w-full bg-slate-950 border border-slate-700 rounded-md">
      <div
        className="flex-1 flex justify-center items-center p-4 bg-slate-600"
        role="presentation"
        // TODO use button instead
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <Key keyStr={keyData ? keyData.code : 'No key'} />
      </div>
      <div className="flex-1 p-4">
        <GroupOptions>
          <Option
            initialState={Boolean(keyData)}
            onChange={(state) => console.log(state)}
          >
            Value
          </Option>
          <Option onChange={() => {
            setAlts((a) => ({ ...a, shift: !a.shift }));
            setShiftValue('');
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
          disabled={!keyData}
        />
        <InputLabel
          label="Shift Value"
          id="shift-value"
          value={shiftValue}
          onChange={(evt) => setShiftValue(evt.target.value)}
          disabled={!alts.shift}
        />
        <Button onClick={handleUpdateKeyConfig}>Set Value</Button>
      </div>
    </section>
  );
}
