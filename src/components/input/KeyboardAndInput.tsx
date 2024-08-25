'use client';

import {
  useLayoutEffect, useRef, useState,
} from 'react';
import KeyNotification, { KeyNotificationActions, KeyNotificationInfo } from './KeyNotification';
import Textarea from '../common/Textarea';
import Option from '../common/Option';
import { SwapVertIcon } from '../common/icons';
import useKBStore from '@/store';

export default function KeyboardAndInput() {
  const keyboardConfig = useKBStore((s) => s.keyboardConfig);
  const replace = useKBStore((s) => s.config.replace);
  const toggleSwap = useKBStore((s) => s.toggleSwap);

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

  // Actions set for KeyNotification element
  const keyNotificationRef = useRef<KeyNotificationActions>(null);

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (replace && evt.code in keyboardConfig) {
      // Default character input needs to be replaced
      if (((evt.shiftKey && !evt.getModifierState('CapsLock')) || (evt.getModifierState('CapsLock') && !evt.shiftKey))
        && keyboardConfig[evt.code].shiftValue !== undefined) {
        replacement.current = keyboardConfig[evt.code].shiftValue as string;
      } else {
        replacement.current = keyboardConfig[evt.code].value;
      }
    } else { // Use default input
      replacement.current = null;
    }
    // Key notification info
    const newKPInfo: KeyNotificationInfo = {
      code: evt.code,
      key: evt.key,
      shiftKey: evt.shiftKey,
      capsLock: evt.getModifierState('CapsLock'),
    };
    // console.log('keydown', newKPInfo);
    if (replacement.current !== null) {
      newKPInfo.replacement = replacement.current;
    }
    keyNotificationRef.current?.setKeyInfo(newKPInfo);
  };
  const handleBeforeInput = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Save cursor position before update (before input)
    // Browsers update the cursor position after changing the input's value, so
    //  when Change event is emitted the cursor position was already updated
    // console.log(evt.target.selectionStart, evt.target.selectionEnd);
    cursor.current.start = evt.target.selectionStart as number;
    cursor.current.end = evt.target.selectionEnd as number;
  };
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(replacement.current);
    // console.log('change', cursor.current);
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
    // console.log('effect', cursor.current);
    // Update the real cursor position before browser repaints the screen
    // Only necessary when textare value is updated
    textareaRef.current?.setSelectionRange(
      cursor.current.start,
      cursor.current.end,
    );
  }, [textareaValue]);

  return (
    <section className="w-full max-w-4xl space-y-2">
      <Option state={replace} onClick={toggleSwap}>
        <SwapVertIcon className="inline-block w-4" />
        Replace
      </Option>
      <Textarea
        value={textareaValue}
        onKeyDown={handleKeyDown}
        onBeforeInput={handleBeforeInput}
        onChange={handleChange}
        ref={textareaRef}
      />
      <KeyNotification ref={keyNotificationRef} />
    </section>
  );
}
