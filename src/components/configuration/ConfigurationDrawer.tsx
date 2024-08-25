import { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon, SettingsIcon } from '../common/icons';
import Configuration from './Configuration';
import KeyConfigCard from './KeyConfigCard';
import Button from '../common/Button';
import { parseKeyboardConfig } from '@/utils';
import useKBStore from '@/store';

export default function ConfigurationDrawer() {
  const keyboardConfig = useKBStore((s) => s.keyboardConfig);
  const setKBConfig = useKBStore((s) => s.setKBConfig);
  const resetKBConfig = useKBStore((s) => s.resetKBConfig);

  const [open, setOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          try {
            setKBConfig(parseKeyboardConfig(JSON.parse(evt.target.result as string)));
          } catch (error) {
            if (inputFileRef.current) {
              inputFileRef.current.value = '';
            }
          }
        }
      };
      reader.readAsText(file);
    }
  }, [file, setKBConfig]);
  return (
    <div className={`fixed bottom-0 left-0 right-0 flex flex-col max-w-4xl m-auto max-h-[50vh] bg-slate-900 rounded-t-lg border-t-[.1em] border-x-[.1em] border-slate-600 transition-all${!open ? ' translate-y-[calc(100%-2.35em)]' : ''}`}>
      <div className="p-1 flex justify-center w-full">
        <button
          type="button"
          className="flex px-2 py-1 hover:bg-slate-800 rounded-md"
          onClick={() => setOpen(!open)}
        >
          <SettingsIcon className="w-5" />
          <ArrowDownIcon className={`w-5 transition-transform${open ? ' flip-h' : ''}`} />
        </button>
      </div>
      <div className="relative flex flex-col [&>*]:shrink-0 gap-2 p-2 w-full max-w-4xl m-auto overflow-auto border-t-[.1em] border-slate-600">
        <Configuration />
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-center mb-2 mt-4">Configuration</h2>
          <div className="flex gap-1 flex-wrap">
            <a
              className="hidden"
              href={encodeURI(`data:text/json;charset=utf-8,${JSON.stringify(keyboardConfig)}`)}
              download="EK_config.json"
              ref={downloadRef}
            >
              Download
            </a>
            <Button onClick={() => downloadRef.current?.click()}>Save</Button>
            <input
              type="file"
              className="max-w-full file:px-4 file:py-1 file:font-semibold file:text-slate-900 file:bg-blue-400 file:hover:opacity-90 file:rounded-md file:border-none file:hover:cursor-pointer"
              onChange={(evt) => {
                if (evt.target.files) {
                  setFile(evt.target.files[0]);
                }
              }}
              ref={inputFileRef}
            />
            <Button
              variant="secondary"
              onClick={() => {
                resetKBConfig();
                if (inputFileRef.current) {
                  inputFileRef.current.value = '';
                }
              }}
            >
              Reset
            </Button>
          </div>
          {Object.entries(keyboardConfig)
            .map(([keyCode, keyConfig]) => (
              <KeyConfigCard
                key={keyCode}
                keyCode={keyCode}
                keyConfig={keyConfig}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
