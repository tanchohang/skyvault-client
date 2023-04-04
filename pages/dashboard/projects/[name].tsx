import { Button } from '@tanchohang/langtang-rcl';
import { Actionbar } from 'components/actionbar';
import DeleteProjectButton from 'components/actionbar/button/delete-project';
import NewFolderButton from 'components/actionbar/button/new-folder';
import AppFile from 'components/file';
import FileUpload from 'components/file-upload';
import { useDashboardContext } from 'context/dashboardContext';
import * as fileService from 'lib/services/file.service';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect } from 'react';
import { FileActions, FileType } from 'reducers/files.reducers';
import useSWR from 'swr';

interface Props {}
const ProjectFolder = ({}: Props) => {
  const { state, dispatch } = useDashboardContext();
  const router = useRouter();
  const projectName = router.query.name as string;

  const {
    data: files,
    isLoading: loadingFiles,
    error: filesError,
  } = useSWR('/projects/files', () => fileService.getAllFilesByProject({ pid: state.projectState.currentProject as string }));

  const uploadFiles = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);

    //pack form data in FormData object
    const formData: any = new FormData();
    formData.append('project', state.projectState.currentProject);
    files.map((file) => formData.append('files', file)); //append files to form data

    const uploadedFiles = await fileService.uploadFiles({ formData });
    const typedFiles: FileType[] = uploadedFiles.data.map((file: any) => ({ id: file._id, ...file } as FileType));

    dispatch({ type: FileActions.ADD_FILES_SUCCESS, payload: typedFiles });
  };

  const addNewFolders = async () => {
    const formData: any = new FormData();
    formData.append('project', state.projectState.currentProject);
    formData.append('subfolders', 'new-folder-' + Date.now());

    const folder = await fileService.uploadFiles({ formData });
    // dispatch({ type: FileActions.ADD_FILES_SUCCESS,payload:[{}]as FileType})
    console.log(folder);
  };

  const trashFile = async ({ id }: { id: string }) => {
    try {
      const response = await fileService.trashFile({ id });
      dispatch({ type: FileActions.TRASH_FILE_SUCCESS, payload: id });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!state.projectState.currentProject) {
      // dispatch({ type: PojectActions.SET_CURRENT_PROJECT, payload: project.data._id });
      router.push('/dashboard/projects');
    }
  }, [router, state.projectState.currentProject]);

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
    state.projectState.currentProject && (
      <div>
        <Actionbar>
          <DeleteProjectButton />
          {/* <NewFolderButton onClick={addNewFolders} /> */}
          <FileUpload handleChange={uploadFiles} />
        </Actionbar>
        <h3 className="text-3xl uppercase font-bold mb-5">{projectName}</h3>

        <div className="flex flex-wrap gap-5">
          {state.fileState.files.map(
            (file) =>
              !file.deleted && (
                <div key={file.id} className="flex flex-col items-center gap-3">
                  <AppFile file={file} />
                  <Button size="sm" variant="destructive" onClick={() => trashFile({ id: file.id as string })}>
                    <Trash size={20} />
                  </Button>
                </div>
              )
          )}
        </div>
      </div>
    )
  );
};

export default ProjectFolder;

ProjectFolder.auth = true;
