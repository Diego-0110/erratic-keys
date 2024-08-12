import { useEffect, useState } from 'react';

const activeStyles = 'text-slate-950 font-semibold bg-blue-400';
const disableStyles = 'text-slate-200 bg-slate-800';

interface Props {
  children: React.ReactNode,
  initialState?: boolean,
  onChange: (state: boolean) => void
  condition?: () => boolean
}

export default function Option({
  children, initialState = false, onChange,
  condition = () => true,
}: Props) {
  const [active, setActive] = useState(initialState);
  const handleClick = () => {
    if (condition()) {
      setActive(!active);
      onChange(!active);
    }
  };
  useEffect(() => {
    setActive(initialState);
  }, [initialState]);
  return (
    <button
      type="button"
      className={`px-3 py-1 text-sm rounded-md hover:opacity-90 ${active ? activeStyles : disableStyles}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
