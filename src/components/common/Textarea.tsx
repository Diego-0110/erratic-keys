'use client';

import {
  forwardRef, useRef, useState,
} from 'react';
import { CheckCopyIcon, CopyIcon } from './icons';
import { debounce } from '@/utils';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string
}

const Textarea = forwardRef((props: Props, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
  // Change icon when copy button is clicked
  const [copyBtnIcon, setCopyBtnIcon] = useState<React.ReactNode>(<CopyIcon className="w-4" />);
  // Reset to default icon after 600ms with a debounce
  const debouncedClearBtnIcon = useRef(debounce(() => setCopyBtnIcon(<CopyIcon className="w-4" />), 600));
  const handleClick = () => {
    navigator.clipboard.writeText(props.value);
    setCopyBtnIcon(<CheckCopyIcon className="animate-[bounce_.6s_infinite] w-4 fill-blue-400" />);
    debouncedClearBtnIcon.current();
  };
  return (
    <div className="relative">
      <textarea
        className="p-3 w-full bg-slate-800 border-[.1em] border-slate-600 focus:outline focus:outline-[.125em] focus:outline-offset-[.1em] focus:outline-blue-400 rounded-md [&::-webkit-scrollbar-corner]:bg-transparent"
        rows={4}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        id={props.id}
        ref={ref}
      />
      <button
        type="button"
        className="absolute top-1 right-1 p-1 text-slate-300 bg-slate-800 border-[.1em] border-slate-600 rounded-md opacity-30 hover:opacity-100"
        onClick={handleClick}
      >
        {copyBtnIcon}
      </button>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
