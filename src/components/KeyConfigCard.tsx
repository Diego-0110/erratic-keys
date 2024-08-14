import { KeyConfig } from '@/types';
import Key from './Key';
import { ShiftIcon } from './icons';

interface Props {
  keyCode: string,
  keyConfig: KeyConfig
}
export default function KeyConfigCard({ keyCode, keyConfig }: Props) {
  return (
    <div className="flex w-full border-[.1em] border-slate-600 rounded-md overflow-hidden">
      <div
        className="flex flex-col gap-1 justify-center items-center p-2 px-6 bg-slate-800 border-r-[.1em] border-slate-600"
      >
        <Key keyStr="A" />
        <span className="px-2 text-sm bg-slate-600 rounded-md">
          {keyCode}
        </span>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex flex-1 border-b-[.05em] border-slate-600">
          <div className="flex items-center p-2 px-3 bg-slate-800 border-r-[.1em] border-slate-600">
            <span className="block w-6 h-6 mb-[.2em] bg-slate-300 shadow-[0_0.2em_white] shadow-slate-500 rounded-sm" />
          </div>
          <div className="flex items-center p-2 px-3 text-blue-400 font-semibold">
            <p>{keyConfig.value}</p>
          </div>
        </div>
        {keyConfig.shiftValue !== undefined && (
        <div className="flex flex-1 border-t-[.05em] border-slate-600">
          <div className="flex items-center gap-1 p-2 px-3 bg-slate-800 border-r-[.1em] border-slate-600">
            <span
              className="block p-1 mb-[.2em] text-slate-900 text-xs font-semibold bg-slate-300 shadow-[0_0.2em_white] shadow-slate-500 rounded-sm"
            >
              <ShiftIcon className="w-4" />
            </span>
            <span>+</span>
            <span className="block w-6 h-6 mb-[.2em] bg-slate-300 shadow-[0_0.2em_white] shadow-slate-500 rounded-sm" />
          </div>
          <div className="flex items-center p-2 px-3 text-blue-400 font-semibold">
            <p>{keyConfig.shiftValue}</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
