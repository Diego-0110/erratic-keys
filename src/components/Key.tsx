'use client';

interface Props {
  keyStr: string,
}

export default function Key({ keyStr }: Props) {
  return (
    <button type="button" className="flex justify-center items-center mb-1 px-3 py-2 min-w-10 text-slate-950 bg-slate-300 shadow-[0_0.25em_white] shadow-slate-500 active:translate-y-1 active:shadow-none rounded-sm">
      <span className="font-semibold">{keyStr}</span>
    </button>
  );
}
