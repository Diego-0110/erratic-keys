const trueStyles = 'text-slate-950 font-semibold bg-blue-400';
const falseStyles = 'text-slate-200 bg-slate-800';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode,
  state?: boolean,
  onClick: () => void
}

export default function Option({
  children, state = false, onClick, ...props
}: Props) {
  return (
    <button
      type="button"
      className={`px-3 py-1 text-sm rounded-md ${!props.disabled ? 'hover:opacity-90 ' : ''}${state ? trueStyles : falseStyles}`}
      onClick={onClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </button>
  );
}
