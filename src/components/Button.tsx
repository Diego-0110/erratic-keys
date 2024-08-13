interface CustomProps {
  children: React.ReactNode
}

type Props = CustomProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

const activeStyles = 'bg-sky-400 text-slate-900 hover:opacity-90';
const disableStyles = 'bg-slate-400 text-slate-950';

export default function Button({ children, ...props }: Props) {
  return (
    <button
      type="button"
      className={`px-4 py-1 font-semibold rounded-md ${props.disabled ? disableStyles : activeStyles}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </button>
  );
}
