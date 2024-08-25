'use client';

import { useState } from 'react';
import { KeyConfig } from '@/types';
import Key from '../common/Key';
import InputLabel from '../common/InputLabel';
import Button from '../common/Button';
import GroupOptions from '../common/GroupOptions';
import Option from '../common/Option';
import useKBStore from '@/store';

interface KeyPressed {
  code: string,
  key: string
}

export default function Configuration() {
  const keyboardConfig = useKBStore((s) => s.keyboardConfig);
  const setKeyConfig = useKBStore((s) => s.setKeyConfig);
  const removeKeyConfig = useKBStore((s) => s.removeKeyConfig);

  const [keyPressed, setKeyPressed] = useState<null | KeyPressed>(null);
  const [value, setValue] = useState<string>('');
  const [shiftValue, setShiftValue] = useState<string>('');
  // Exists a configured value with or without shift key pressed
  // Allow the user to reset the key behaviour
  const [replaceOpts, setReplaceOpts] = useState<{
    value: boolean, shift: boolean }>({ value: false, shift: false });

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
    setKeyPressed({ code: evt.code, key: evt.key });
    if (evt.code in keyboardConfig) {
      // There's already a configuration for the key pressed
      setValue(keyboardConfig[evt.code].value);
      setShiftValue(keyboardConfig[evt.code].shiftValue || '');
      setReplaceOpts({
        value: true,
        shift: typeof keyboardConfig[evt.code].shiftValue === 'string',
      });
    } else { // No configuration yet
      setValue('');
      setShiftValue('');
      setReplaceOpts({ value: false, shift: false });
    }
  };
  const handleUpdateKeyConfig = () => {
    if (keyPressed) {
      if (!replaceOpts.value) { // No replace values -> default behaviour
        removeKeyConfig(keyPressed.code);
        return;
      }
      const keyConfig: KeyConfig = {
        value,
      };
      if (replaceOpts.shift) { // Set shift value (optional)
        keyConfig.shiftValue = shiftValue;
      }
      setKeyConfig(keyPressed.code, keyConfig);
    }
  };

  const handleValue = () => {
    if (!keyPressed) return;
    if (replaceOpts.value) {
      setReplaceOpts({ shift: false, value: false });
      setShiftValue('');
    } else {
      setReplaceOpts((a) => ({ ...a, value: !a.value }));
    }
    setValue('');
  };
  const handleShift = () => {
    // Change state only when value without shift is set
    if (replaceOpts.value) {
      setReplaceOpts((a) => ({ ...a, shift: !a.shift }));
      setShiftValue('');
    }
  };

  return (
    <section className="flex max-sm:flex-col w-full border-[.1em] border-slate-600 rounded-md overflow-hidden">
      <div
        className="flex-1 flex flex-col gap-1 justify-center items-center p-4 bg-slate-900 sm:border-r-[.1em] max-sm:border-b-[.1em] border-slate-600 focus:bg-slate-800 outline-none"
        role="textbox"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <Key>{keyPressed ? keyPressed.key : '?'}</Key>
        <span className="px-2 text-sm bg-slate-600 rounded-md">
          {keyPressed ? keyPressed.code : 'No key'}
        </span>
      </div>
      <div className="flex-1 min-w-[28em] max-sm:min-w-full p-4">
        <GroupOptions>
          <Option
            state={replaceOpts.value}
            onClick={handleValue}
            disabled={!keyPressed}
          >
            Value
          </Option>
          <Option
            state={replaceOpts.shift}
            onClick={handleShift}
            disabled={!keyPressed}
          >
            Shift Value
          </Option>
        </GroupOptions>
        <InputLabel
          label="Value"
          id="value"
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
          disabled={!replaceOpts.value}
        />
        <InputLabel
          label="Shift Value"
          id="shift-value"
          value={shiftValue}
          onChange={(evt) => setShiftValue(evt.target.value)}
          disabled={!replaceOpts.shift}
        />
        <Button
          onClick={handleUpdateKeyConfig}
          disabled={!keyPressed}
        >
          Update
        </Button>
      </div>
    </section>
  );
}
