interface CustomProps {
  children: React.ReactNode,
  variant?: 'primary' | 'secondary'
}

type Props = CustomProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
const variantStyles = {
  primary: 'bg-blue-400 text-slate-900 font-semibold hover:opacity-90',
  secondary: 'bg-slate-600 text-slate-200 hover:opacity-90',
};
const disableStyles = 'bg-slate-400 text-slate-950';

export default function Button({ children, variant = 'primary', ...props }: Props) {
  const activeStyles = variantStyles[variant];
  return (
    <button
      type="button"
      className={`px-4 py-1 rounded-md ${props.disabled ? disableStyles : activeStyles}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </button>
  );
}
