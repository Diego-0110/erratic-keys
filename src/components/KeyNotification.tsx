import Key from './Key';

export interface KeyNotificationInfo {
  code: string,
  key: string,
  shiftKey: boolean,
  capsLock: boolean,
  replacement?: string
}

interface Props {
  keyInfo: KeyNotificationInfo
}

export default function KeyNotification({ keyInfo }: Props) {
  const showShift = keyInfo.shiftKey === true && keyInfo.key !== 'Shift';
  return (
    <div className="flex flex-col items-center gap-3 w-fit m-auto p-6 bg-slate-800 rounded-md">
      <div className="flex items-center gap-3">
        {showShift && (
        <>
          <Key keyStr="Shift" />
          <span>+</span>
        </>
        )}
        <div className="flex flex-col items-center gap-1">
          <Key keyStr={keyInfo.key} />
          <span className="px-2 text-sm bg-slate-600 rounded-md">
            {keyInfo.code}
          </span>
        </div>
      </div>
      {keyInfo.replacement !== undefined && (
      <>
        <p>⬇️</p>
        <p className="text-blue-400 font-bold">
          &quot;
          {keyInfo.replacement}
          &quot;
        </p>
      </>
      )}
    </div>
  );
}
