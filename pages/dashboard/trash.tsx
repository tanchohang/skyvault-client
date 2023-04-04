import { Button } from '@tanchohang/langtang-rcl';
import { Actionbar } from 'components/actionbar';
import EmptyTrashButton from 'components/actionbar/button/empty-trash';
import AppFile from 'components/file';
import { useDashboardContext } from 'context/dashboardContext';
import { Recycle, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { FileActions } from 'reducers/files.reducers';
import * as fileService from 'lib/services/file.service';
import useSWR from 'swr';

interface Props {}
function Trash({}: Props) {
  const { state, dispatch } = useDashboardContext();
  const { data, error, isLoading } = useSWR('/files', fileService.getAllFiles);

  useEffect(() => {
    if (error) dispatch({ type: FileActions.FETCH_FILES_ERROR });
    if (data) {
      dispatch({ type: FileActions.FETCH_FILES_SUCCESS, payload: data.data.map((file: any) => ({ id: file._id, ...file })) });
    }
  }, [error, data, dispatch]);

  async function handleDelete({ id }: { id: string }) {
    try {
      const response = await fileService.deleteFile({ id });
      dispatch({ type: FileActions.DELETE_FILE_SUCCESS, payload: id });
    } catch (error) {
      throw error;
    }
  }
  async function handleDeleteAllTrash() {
    try {
      const response = await fileService.emptyTrash();
      dispatch({ type: FileActions.EMPTY_TRASH_SUCCESS });
    } catch (error) {
      throw error;
    }
  }

  async function handleRestore({ id }: { id: string }) {
    try {
      const response = await fileService.restoreFile({ id });
      dispatch({ type: FileActions.RESTORE_FILE_SUCCESS, payload: id });
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <Actionbar>
        <EmptyTrashButton onClick={handleDeleteAllTrash} />
      </Actionbar>
      <div className="flex flex-wrap gap-5">
        {state.fileState.files.map(
          (file) =>
            file.deleted &&
            !file.archived && (
              <div key={file.id} className="flex flex-col items-center">
                <AppFile file={file} />
                <div>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete({ id: file.id as string })}>
                    <Trash2 size={20} />
                  </Button>
                  <Button size="sm" variant="default" onClick={() => handleRestore({ id: file.id as string })}>
                    <Recycle size={20} />
                  </Button>
                </div>
              </div>
            )
        )}
      </div>
    </>
  );
}
export default Trash;
Trash.auth = true;
