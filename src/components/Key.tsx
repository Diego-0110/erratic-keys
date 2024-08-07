'use client';

interface Props {
  value: string
}

export default function Key({ value }: Props) {
  return (
    <button type="button" className="flex justify-center items-center px-2 h-8 bg-slate-200 text-slate-950 shadow-[0_0.25em_white] shadow-slate-500 active:translate-y-1 active:shadow-none rounded-sm">
      <span className="font-semibold">{value}</span>
    </button>
  );
}
