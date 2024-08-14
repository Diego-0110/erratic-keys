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
  code: string,
  key: string
}

export default function Configuration({ keyboardConfig, setKeyConfig }: Props) {
  // TODO Caps Lock
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
    if (keyData) { // TODO remove key if null
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
    <section className="flex w-full border-[.1em] border-slate-600 rounded-md overflow-hidden">
      <div
        className="flex-1 flex flex-col gap-1 justify-center items-center p-4 bg-slate-800"
        role="presentation"
        // TODO use button instead
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <Key keyStr={keyData ? keyData.key : '??'} />
        <span className="px-2 text-sm bg-slate-600 rounded-md">
          {keyData ? keyData.code : 'No key'}
        </span>
      </div>
      <div className="flex-1 p-4">
        <GroupOptions>
          <Option
            initialState={alts.value}
            onChange={() => {
              if (alts.value) {
                setAlts({ shift: false, value: false });
              } else {
                setAlts((a) => ({ ...a, value: !a.value }));
              }
              setValue('');
            }}
            condition={() => Boolean(keyData)}
          >
            Value
          </Option>
          <Option
            initialState={alts.shift}
            onChange={() => {
              setAlts((a) => ({ ...a, shift: !a.shift }));
              setShiftValue('');
            }}
            condition={() => Boolean(keyData) && alts.value}
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
          Set Value
        </Button>
      </div>
    </section>
  );
}
