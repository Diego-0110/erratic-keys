'use client';

import {
  useLayoutEffect, useRef, useState,
} from 'react';
import { KeyboardConfig } from '@/types';
import KeyNotification, { KeyNotificationInfo } from './KeyNotification';

export const dfKeyboardConfig: KeyboardConfig = {
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

interface Props {
  keyboardConfig: KeyboardConfig
}

function debounce(func: () => void, timeout: number) {
  let timeId: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeId);
    timeId = setTimeout(func, timeout);
  };
}

export default function KeyboardAndInput({ keyboardConfig }: Props) {
  // string (replace default with this) or null (use default input character)
  const replacement = useRef<(string | null)>(null);
  // Cursor position inside input
  const cursor = useRef({
    start: 0,
    end: 0,
  });
  // replacement and cursor are used for communication between events
  // Since those events are executed in the same order always, there's no need
  //  for locks
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaValue, setTextareaValue] = useState<string>('');

  const [keyPressInfo, setKeyPressInfo] = useState<KeyNotificationInfo | null>(null);
  const debouncedClearKeyPressInfo = useRef<() => void>(debounce(() => {
    setKeyPressInfo(null);
  }, 2000)); // TODO vanish animation

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    const obj = {
      evt: 'keydown',
      key: evt.key,
      code: evt.code,
      shiftKey: evt.shiftKey,
      capsLock: evt.getModifierState('CapsLock'),
    };
    console.log(obj);
    if (evt.code in keyboardConfig) {
      // Default character input needs to be replaced
      if (evt.shiftKey) {
        replacement.current = keyboardConfig[evt.code].shiftValue
          || keyboardConfig[evt.code].value;
      } else {
        replacement.current = keyboardConfig[evt.code].value;
      }
    } else { // Use default input
      replacement.current = null;
    }
    setKeyPressInfo({ keyCode: evt.code });
    debouncedClearKeyPressInfo.current();
  };
  const handleBeforeInput = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Save cursor position before update (before input)
    // Browsers update the cursor position after changing the input's value, so
    //  when Change event is emitted the cursor position was already updated
    console.log(evt.target.selectionStart, evt.target.selectionEnd);
    // console.log('beforeInput', 'data' in evt && evt.data as string);
    cursor.current.start = evt.target.selectionStart as number;
    cursor.current.end = evt.target.selectionEnd as number;
  };
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(replacement.current);
    console.log('change', cursor.current);
    if (replacement.current === null) { // Use default input
      cursor.current.start = evt.target.selectionStart as number;
      cursor.current.end = evt.target.selectionEnd as number;
      setTextareaValue(evt.target.value);
    } else { // Ignore default input and insert a custom string
      const { start, end } = cursor.current;
      // Cursor positionated after string inserted
      cursor.current.start += replacement.current.length;
      cursor.current.end = cursor.current.start;
      // If cursor was selecting text, replace it
      setTextareaValue((v) => [v.substring(0, start),
        replacement.current,
        v.substring(end)].join(''));
    }
  };

  useLayoutEffect(() => {
    console.log('effect', cursor.current);
    // Update the real cursor position before browser repaints the screen
    // Only necessary when textare value is updated
    textareaRef.current?.setSelectionRange(
      cursor.current.start,
      cursor.current.end,
    );
  }, [textareaValue]);

  return (
    <section className="w-full">
      <textarea
        className="mb-2 w-full px-2 py-1 border-2 border-slate-200 rounded-sm"
        value={textareaValue}
        onKeyDown={handleKeyDown}
        onBeforeInput={handleBeforeInput}
        onChange={handleChange}
        ref={textareaRef}
      />
      {keyPressInfo && <KeyNotification keyInfo={keyPressInfo} />}
    </section>
  );
}
