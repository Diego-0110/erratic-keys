const activeStyles = 'text-slate-950 font-semibold bg-blue-400';
const disableStyles = 'text-slate-200 bg-slate-800';

interface Props {
  children: React.ReactNode,
  state?: boolean,
  onClick: () => void
}

export default function Option({
  children, state = false, onClick,
}: Props) {
  return (
    <button
      type="button"
      className={`px-3 py-1 text-sm rounded-md hover:opacity-90 ${state ? activeStyles : disableStyles}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
