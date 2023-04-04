import * as fileService from 'lib/services/file.service';

import { useDashboardContext } from 'context/dashboardContext';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { FileActions } from 'reducers/files.reducers';
import AppFile from 'components/file';
import { Actionbar } from 'components/actionbar';
import { Button } from '@tanchohang/langtang-rcl';
import { Upload } from 'lucide-react';
import UploadForm from 'components/upload-form';

interface Props {}
const Dashboard = ({}: Props) => {
  const { state, dispatch } = useDashboardContext();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { data: files, isLoading: loadingFiles, error: filesError } = useSWR('/files', () => fileService.getAllFiles());

  useEffect(() => {
    if (filesError) {
      dispatch({
        type: FileActions.FETCH_FILES_ERROR,
      });
    }
    if (files) {
      dispatch({ type: FileActions.FETCH_FILES_SUCCESS, payload: files.data.map((p: any) => ({ id: p._id, ...p })) });
    }
  }, [files, filesError, dispatch]);
  return (
    <div>
      <Actionbar>
        <Button size="sm" variant="default" onClick={() => setIsFormVisible(!isFormVisible)}>
          <Upload />
          <span className="ml-2">Upload</span>
        </Button>
      </Actionbar>
      <div className="flex flex-wrap gap-5 ">
        {state.fileState.files.map(
          (file) =>
            !file.deleted && (
              <div key={file.id} className="flex flex-col items-center gap-3">
                <AppFile file={file} />
              </div>
            )
        )}
      </div>
      {isFormVisible && <UploadForm />}
    </div>
  );
};
export default Dashboard;
Dashboard.auth = true;
