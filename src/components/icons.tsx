/* eslint-disable react/jsx-props-no-spreading */
interface Props {
  className: string
}

export function CopyIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} width="32" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 2h-6.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H3v20h18zm-9 0c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m7 18H5V4h2v3h10V4h2z" />
    </svg>
  );
}

export function CheckCopyIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} width="32" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4v12H8V4zm0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-7.53 12L9 10.5l1.4-1.41l2.07 2.08L17.6 6L19 7.41zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4z" />
    </svg>
  );
}

export function SwapVertIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} width="32" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99zM9 3L5 6.99h3V14h2V6.99h3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99zM9 3L5 6.99h3V14h2V6.99h3z" />
    </svg>
  );
}
