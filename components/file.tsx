import { Button } from '@tanchohang/langtang-rcl';
import { useDashboardContext } from 'context/dashboardContext';
import { Cross, Delete, FileImage, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FileActions, FileType } from 'reducers/files.reducers';
import * as fileService from '../lib/services/file.service';

interface Props {
  file: FileType;
}
function AppFile({ file }: Props) {
  const { state, dispatch } = useDashboardContext();
  const [focus, setFocus] = useState(false);
  const [name, setName] = useState(file.originalName);

  const updateFile = async ({ id, name }: { id: string; name: string }) => {
    try {
      const response = await fileService.updateFile({ id, name: name.trim() });
      dispatch({ type: FileActions.UPDATE_FILE_SUCCESS, payload: response.data });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Link href={file.link!} className="hover:text-red-500  flex flex-col items-center justify-center border">
        <Image src={file.link!} width={80} height={150} alt={file.fileName} />
      </Link>

      <textarea
        className="text-center flex flex-wrap resize-none overflow-hidden focus:outline-none "
        rows={1}
        value={name}
        autoFocus={focus}
        onKeyUp={(e) => {
          if (e.code === 'Enter') {
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => updateFile({ name: e.currentTarget.value.trim().replace(/\n/, ''), id: file.id as string })}
        onChange={(e) => {
          setName(e.target.value.trim().replace(/\n/, ''));
        }}
        onClick={(e) => {
          e.currentTarget.focus();
        }}
      />
    </div>
  );
}
export default AppFile;
