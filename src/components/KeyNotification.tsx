import Key from './Key';

export interface KeyNotificationInfo {
  keyCode: string
}

interface Props {
  keyInfo: KeyNotificationInfo
}

export default function KeyNotification({ keyInfo }: Props) {
  return (
    <div className="flex justify-center w-fit m-auto px-6 py-4 bg-slate-800 rounded-md">
      <Key value={keyInfo.keyCode} />
    </div>
  );
}
