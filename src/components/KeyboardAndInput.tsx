'use client';

import { useRef, useState } from 'react';
import Key from './Key';

const keyboardConfig: Record<string, { value: string, shiftValue?: string }> = {
  KeyA: {
    value: '😀',
    shiftValue: '😁',
  },
  KeyK: {
    value: '😅',
    shiftValue: '🤣',
  },
  KeyY: {
    value: '😪',
    shiftValue: '😴',
  },
  KeyH: {
    value: '😶‍🌫️',
  },
};

export default function KeyboardAndInput() {
  const replacements = useRef<(string | null)>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeyDown = (evt: React.KeyboardEvent) => {
    const obj = {
      evt: 'keydown',
      key: evt.key,
      code: evt.code,
      altKey: evt.altKey,
    };
    console.log(obj);
    if (evt.code in keyboardConfig) {
      if (evt.shiftKey) {
        replacements.current = keyboardConfig[evt.code].shiftValue
          || keyboardConfig[evt.code].value;
      } else {
        replacements.current = keyboardConfig[evt.code].value;
      }
    } else {
      replacements.current = null;
    }
  };
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(replacements.current);
    if (replacements.current === null) {
      setInputValue(evt.target.value);
    } else {
      setInputValue((v) => v + replacements.current);
    }
  };

  const handleClick = () => {
    console.log('event');
    console.log(new KeyboardEvent('keydown', { code: 'KeyA' }));
    inputRef.current?.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
  };

  return (
    <section>
      <input
        className="mb-2 px-2 py-1 border-2 border-slate-200 rounded-sm"
        type="text"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        ref={inputRef}
      />
      <Key />
      <button type="button" onClick={handleClick}>Click</button>
    </section>
  );
}
