import * as fileService from 'lib/services/file.service';

import { useDashboardContext } from 'context/dashboardContext';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { FileActions, FileType } from 'reducers/files.reducers';
import AppFile from 'components/file';
import { Actionbar } from 'components/actionbar';
import { Button } from '@tanchohang/langtang-rcl';
import { Upload, X } from 'lucide-react';
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
        <Button size="sm" variant="default" onClick={() => setIsFormVisible(true)}>
          <Upload />
          <span className="ml-2">Upload</span>
        </Button>
      </Actionbar>
      <div className="p-4">
        {state.fileState.files.length > 0 && (
          <div className="flex flex-col flex-wrap gap-5 ">
            <PublicSection files={state.fileState.files.filter((f) => f.public === true)} />
            <PrivateSection files={state.fileState.files.filter((f) => f.public === false)} />
          </div>
        )}
        {state.fileState.files.length === 0 && <h4 className="text-2xl">Upload Files</h4>}
      </div>
      {isFormVisible && (
        <div className="h-[100vh] w-[100vw] absolute bg-black/90 inset-0">
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              setIsFormVisible(false);
            }}
            className="absolute ml-[70%] mt-[10%]"
          >
            <X size={20} />
          </Button>
          <UploadForm
            submitHandler={async (formData) => {
              const file = await fileService.uploadFiles({ formData });
              dispatch({ type: FileActions.ADD_FILES_SUCCESS, payload: file.data.map((f: any) => ({ id: f._id, ...f } as FileType)) });
              setIsFormVisible(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

function PublicSection({ files }: { files: FileType[] }) {
  return files.length > 0 ? (
    <>
      <h3 className="text-3xl">Public Photos</h3>
      <div className="flex flex-wrap gap-5 ">
        {files.map(
          (file) =>
            !file.deleted && (
              <div key={file.id} className="flex flex-col items-center gap-3">
                <AppFile file={file} />
              </div>
            )
        )}
      </div>
    </>
  ) : (
    <></>
  );
}

function PrivateSection({ files }: { files: FileType[] }) {
  return files.length > 0 ? (
    <>
      <h3 className="text-3xl">Private Photos</h3>
      <div className="flex flex-wrap gap-5 ">
        {files.map(
          (file) =>
            !file.deleted && (
              <div key={file.id} className="flex flex-col items-center gap-3">
                <AppFile file={file} />
              </div>
            )
        )}
      </div>
    </>
  ) : (
    <></>
  );
}

export default Dashboard;
Dashboard.auth = true;
