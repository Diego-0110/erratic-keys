import {
  forwardRef, useImperativeHandle, useRef, useState,
} from 'react';
import { CapsLockIcon, SwapVertIcon } from '../common/icons';
import Key from '../common/Key';
import { debounce } from '@/utils';

export interface KeyNotificationInfo {
  code: string,
  key: string,
  shiftKey: boolean,
  capsLock: boolean,
  replacement?: string
}

const newspaperSpinning = [
  { opacity: '100' },
  { opacity: '0' },
];

const newspaperTiming = {
  duration: 400,
  iterations: 1,
};

export interface KeyNotificationActions {
  setKeyInfo: (keyInfo: KeyNotificationInfo) => void
}

const KeyNotification = forwardRef((
  props: {},
  ref: React.ForwardedRef<KeyNotificationActions>,
) => {
  const [data, setData] = useState<KeyNotificationInfo | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const animateRef = useRef<Animation | null>(null);
  const debounceVanish = useRef<() => void>(debounce(() => {
    animateRef.current = elementRef.current?.animate(newspaperSpinning, newspaperTiming) || null;
    animateRef.current?.play();
  }, 1600));
  const debounceDelete = useRef<() => void>(debounce(() => {
    setData(null);
  }, 1990));
  useImperativeHandle(ref, () => ({
    setKeyInfo(keyInfo) {
      setData(keyInfo);
      animateRef.current?.cancel();
      debounceVanish.current();
      debounceDelete.current();
    },
  }), []);
  if (!data) {
    return null;
  }
  const showShift = data.shiftKey === true && data.key !== 'Shift';
  return (
    <div
      className="flex flex-col items-center gap-3 relative z-10 w-fit m-auto p-6 bg-slate-800 bg-opacity-90 rounded-md"
      ref={elementRef}
    >
      <div className="flex items-center gap-3 relative">
        {data.capsLock && (
        <span className="absolute -top-4 -left-4 p-[.1em] bg-blue-400 rounded-full">
          <CapsLockIcon className="w-4 text-slate-900" />
        </span>
        )}
        {showShift && (
        <>
          <Key>Shift</Key>
          <span>+</span>
        </>
        )}
        <div className="flex flex-col items-center gap-1">
          <Key>{data.key}</Key>
          <span className="px-2 text-sm bg-slate-600 rounded-md">
            {data.code}
          </span>
        </div>
      </div>
      {data.replacement !== undefined && (
      <>
        <SwapVertIcon className="w-6" />
        <p className="text-blue-400 font-bold">
          &quot;
          {data.replacement}
          &quot;
        </p>
      </>
      )}
    </div>
  );
});
KeyNotification.displayName = 'KeyNotification';

export default KeyNotification;
