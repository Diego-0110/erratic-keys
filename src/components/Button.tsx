interface CustomProps {
  children: React.ReactNode
}

type Props = CustomProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...props }: Props) {
  return (
    <button
      type="button"
      className="px-4 py-1 bg-blue-400 text-slate-900 font-semibold rounded-md hover:opacity-90"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </button>
  );
}
