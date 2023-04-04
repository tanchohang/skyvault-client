import { Button, Input } from '@tanchohang/langtang-rcl';
import { Upload } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';
import { FileWatcher } from 'typescript';

interface Props {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FileUpload({ handleChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Input type="file" onChange={(e) => handleChange(e)} multiple style={{ display: 'none' }} ref={inputRef} />

      <Button variant="dark" size="md" onClick={() => inputRef.current!.click()} className="flex gap-3">
        <Upload size={20} />
        Upload
      </Button>
    </>
  );
}
export default FileUpload;
