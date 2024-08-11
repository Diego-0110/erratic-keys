import { forwardRef } from 'react';

type Props = React.HTMLAttributes<HTMLTextAreaElement> &
React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea2 = forwardRef((props: Props, ref: React.ForwardedRef<HTMLTextAreaElement>) => (
  <textarea
    className="p-3 w-full bg-slate-800 border border-slate-700 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-400 rounded-md"
    rows={4}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    ref={ref}
  />
));

Textarea2.displayName = 'Textarea';

export default Textarea2;
