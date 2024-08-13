/* eslint-disable jsx-a11y/label-has-associated-control */
interface CustomProps {
  label: string,
}

type Props = CustomProps & React.InputHTMLAttributes<HTMLInputElement>;

export default function InputLabel({ label, id, ...props }: Props) {
  return (
    <div className="flex flex-col gap-1 my-2">
      <label
        htmlFor={id}
        className={`text-sm ${props.disabled ? 'text-slate-400' : ''}`}
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="px-2 py-1 w-full bg-slate-800 disabled:bg-slate-900 border-[.1em] border-slate-600 focus:outline focus:outline-[.125em] focus:outline-offset-[.1em] focus:outline-blue-400 rounded-md"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </div>
  );
}
