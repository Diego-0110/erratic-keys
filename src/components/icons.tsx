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

export function ShiftIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} width="32" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 21v-8H3l9-11l9 11h-5v8zm2-2h4v-8h2.775L12 5.15L7.225 11H10zm2-8" />
    </svg>
  );
}

export function DoubleArrowIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} width="32" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 17.59L7.41 19L12 14.42L16.59 19L18 17.59l-6-6z" />
      <path d="m6 11l1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z" />
    </svg>
  );
}

export function SettingsIcon(props: Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} width="32" fill="currentColor" viewBox="0 0 24 24">
      <path d="m19.44 12.99l-.01.02c.04-.33.08-.67.08-1.01c0-.34-.03-.66-.07-.99l.01.02l2.44-1.92l-2.43-4.22l-2.87 1.16l.01.01c-.52-.4-1.09-.74-1.71-1h.01L14.44 2H9.57l-.44 3.07h.01c-.62.26-1.19.6-1.71 1l.01-.01l-2.88-1.17l-2.44 4.22l2.44 1.92l.01-.02c-.04.33-.07.65-.07.99c0 .34.03.68.08 1.01l-.01-.02l-2.1 1.65l-.33.26l2.43 4.2l2.88-1.15l-.02-.04c.53.41 1.1.75 1.73 1.01h-.03L9.58 22h4.85s.03-.18.06-.42l.38-2.65h-.01c.62-.26 1.2-.6 1.73-1.01l-.02.04l2.88 1.15l2.43-4.2s-.14-.12-.33-.26zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5" />
    </svg>
  );
}
