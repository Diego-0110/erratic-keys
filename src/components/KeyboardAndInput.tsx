'use client';

import {
  useLayoutEffect, useRef, useState,
} from 'react';
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
  const replacement = useRef<(string | null)>(null);
  const cursor = useRef({
    start: 0,
    end: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

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
        replacement.current = keyboardConfig[evt.code].shiftValue
          || keyboardConfig[evt.code].value;
      } else {
        replacement.current = keyboardConfig[evt.code].value;
      }
    } else {
      replacement.current = null;
    }
  };
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(replacement.current);
    cursor.current.start = evt.target.selectionStart as number;
    cursor.current.end = evt.target.selectionEnd as number;
    console.log('change', cursor.current);
    if (replacement.current === null) {
      setInputValue(evt.target.value);
    } else {
      const start = cursor.current.start - 1;
      const end = cursor.current.end - 1;
      cursor.current.start += replacement.current.length - 1;
      cursor.current.end += replacement.current.length - 1;
      // TODO use selectionStart for selection and textarea
      setInputValue((v) => [v.substring(0, start),
        replacement.current,
        v.substring(end)].join(''));
    }
  };

  useLayoutEffect(() => {
    console.log('effect', cursor.current);
    inputRef.current?.setSelectionRange(
      cursor.current.start,
      cursor.current.end,
    );
  }, [inputValue]);

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
