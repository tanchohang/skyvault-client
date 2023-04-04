import { ActionType, useDashboardContext } from 'context/dashboardContext';
import { Folder } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { PojectActions, ProjectType } from 'reducers/projects.reducers';
import * as projectService from '../lib/services/project.service';

interface Props {
  url: string;
  nameFromApi: string;
  id: string;
}
function AppFolder({ url, nameFromApi, id }: Props) {
  const { state, dispatch } = useDashboardContext();
  const [focus, setFocus] = useState(false);
  const [name, setName] = useState(nameFromApi);

  const updateProduct = async ({ id, name }: { id: string; name: string }) => {
    try {
      const response = await projectService.updateProject({ id, name: name.trim() });
      dispatch({ type: PojectActions.UPDATE_PROJECT_SUCCESS, payload: response.data });
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Link
        href={url}
        className="hover:text-red-500 hover:bg-black hover:shadow-xl h-[100px] w-[100px] border-2 border-black flex flex-col items-center justify-center"
      >
        <Folder size={50} />
      </Link>

      <textarea
        className="text-center flex flex-wrap resize-none overflow-hidden focus:outline-none "
        rows={3}
        value={name}
        autoFocus={focus}
        onKeyUp={(e) => {
          if (e.code === 'Enter') {
            e.currentTarget.blur();
          }
        }}
        onBlur={(e) => updateProduct({ name: e.currentTarget.value, id })}
        onChange={(e) => {
          setName(e.target.value);
        }}
        onClick={(e) => {
          e.currentTarget.focus();
        }}
      />
    </div>
  );
}
export default AppFolder;
