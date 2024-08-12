interface Props {
  children: React.ReactNode
}

export default function GroupOptions({ children }: Props) {
  return (
    <div className="flex gap-1 p-1 w-fit border-[.1em] border-slate-500 rounded-xl">
      {children}
    </div>
  );
}
