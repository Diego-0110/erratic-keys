interface Props {
  children?: React.ReactNode,
  variant?: 'normal' | 'small'
}

export default function Key({ children = null, variant = 'normal' }: Props) {
  if (variant === 'small') {
    return (
      <div className="inline-flex justify-center items-center mb-[.2em] p-1 min-w-6 min-h-6 text-slate-950 font-semibold bg-slate-300 shadow-[0_0.2em_white] shadow-slate-500 rounded-sm">
        {children}
      </div>
    );
  }
  return (
    <div className="inline-flex justify-center items-center mb-1 px-3 py-2 min-w-10 min-h-10 text-slate-950 font-semibold bg-slate-300 shadow-[0_0.25em_white] shadow-slate-500 rounded-sm">
      {children}
    </div>
  );
}
