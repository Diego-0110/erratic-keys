import { KeyConfig } from '@/types';
import Key from './Key';
import { ShiftIcon } from './icons';

interface Props {
  keyCode: string,
  keyConfig: KeyConfig
}
export default function KeyConfigCard({ keyCode, keyConfig }: Props) {
  return (
    <div className="flex max-sm:flex-col w-full border-[.1em] border-slate-600 rounded-md overflow-hidden">
      <div
        className="flex flex-col gap-1 justify-center items-center p-2 px-5 bg-slate-800 sm:border-r-[.1em] max-sm:border-b-[.1em] border-slate-600"
      >
        <Key keyStr="?" />
        <span className="px-2 text-sm bg-slate-600 rounded-md">
          {keyCode}
        </span>
      </div>
      <div className="grid grid-cols-[min-content_auto] w-full [&>*]:flex [&>*]:items-center">
        <div className="p-2 px-3 bg-slate-800 border-r-[.1em] border-slate-600">
          <span className="block w-6 h-6 mx-auto mb-[.2em] bg-slate-300 shadow-[0_0.2em_white] shadow-slate-500 rounded-sm" />
        </div>
        <div className="p-2 px-3 overflow-hidden">
          <p className="text-blue-400 font-semibold text-ellipsis overflow-hidden">{keyConfig.value}</p>
        </div>
        {keyConfig.shiftValue !== undefined && (
        <>
          <div className="flex gap-2 p-2 px-3 bg-slate-800 border-t-[.1em] border-r-[.1em] border-slate-600">
            <span
              className="inline-block p-1 mb-[.2em] text-slate-900 text-xs font-semibold bg-slate-300 shadow-[0_0.2em_white] shadow-slate-500 rounded-sm"
            >
              <ShiftIcon className="w-4" />
            </span>
            <span className="inline-block">+</span>
            <span className="inline-block w-6 h-6 mb-[.2em] bg-slate-300 shadow-[0_0.2em_white] shadow-slate-500 rounded-sm" />
          </div>
          <div className="p-2 px-3 overflow-hidden border-t-[.1em] border-slate-600">
            <p className="text-blue-400 font-semibold text-ellipsis overflow-hidden">{keyConfig.shiftValue}</p>
          </div>
        </>
        )}
      </div>
    </div>
  );
}
