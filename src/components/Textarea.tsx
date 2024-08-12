import { forwardRef } from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea2 = forwardRef((props: Props, ref: React.ForwardedRef<HTMLTextAreaElement>) => (
  <textarea
    className="p-3 w-full bg-slate-800 border-[.1em] border-slate-600 focus:outline focus:outline-[.125em] focus:outline-offset-[.1em] focus:outline-blue-400 rounded-md"
    rows={4}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    id={props.id}
    ref={ref}
  />
));

Textarea2.displayName = 'Textarea';

export default Textarea2;
