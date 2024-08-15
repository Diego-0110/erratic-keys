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
        <Key keyStr="A" />
        <span className="px-2 text-sm bg-slate-600 rounded-md">
          {keyCode}
        </span>
      </div>
      <table className="flex-1">
        <tbody className="divide-y-[.1em] divide-slate-600">
          <tr className="divide-x-[.1em] divide-slate-600">
            <td className="p-2 px-3 bg-slate-800">
              <span className="block w-6 h-6 mx-auto mb-[.2em] bg-slate-300 shadow-[0_0.2em_white] shadow-slate-500 rounded-sm" />
            </td>
            <td className="p-2 px-3 w-full">
              <p className="text-blue-400 font-semibold">{keyConfig.value}</p>
            </td>
          </tr>
          {keyConfig.shiftValue !== undefined && (
          <tr className="divide-x-[.1em] divide-slate-600">
            <td className="p-2 px-3 bg-slate-800">
              <div className="flex gap-2">
                <span
                  className="inline-block p-1 mb-[.2em] text-slate-900 text-xs font-semibold bg-slate-300 shadow-[0_0.2em_white] shadow-slate-500 rounded-sm"
                >
                  <ShiftIcon className="w-4" />
                </span>
                <span className="inline-block">+</span>
                <span className="inline-block w-6 h-6 mb-[.2em] bg-slate-300 shadow-[0_0.2em_white] shadow-slate-500 rounded-sm" />
              </div>
            </td>
            <td className="p-2 px-3 w-full">
              <p className="text-blue-400 font-semibold">{keyConfig.shiftValue}</p>
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
