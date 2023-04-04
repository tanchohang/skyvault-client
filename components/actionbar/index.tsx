import { Button } from '@tanchohang/langtang-rcl';
import { FolderPlus, Trash, Upload } from 'lucide-react';
import { useRouter } from 'next/router';
import { ReactNode, useContext } from 'react';
import FileUpload from '../file-upload';
import CreateProjectButton from './button/create-project';

interface Props {
  children: ReactNode;
}
function Actionbar({ children }: Props) {
  const router = useRouter();
  return (
    <div className="flex flex-row-reverse gap-5 p-5">{children}</div>

    // <div className=" flex flex-row-reverse gap-5 p-5">
    //   {router.pathname.match(/\/dashboard\/projects\/+/) && (
    //     <>
    //       <Button
    //         variant="destructive"
    //         size="md"
    //         className="flex gap-3"
    //         onClick={() => {
    //           console.log('delete project');
    //           dispatch({ type: 'DELETE', payload: state.currentProject });
    //           router.push('/dashboard/projects');
    //         }}
    //       >
    //         <Trash size={20} />
    //         Delete Project
    //       </Button>
    //       <FileUpload />
    //       <Button size="md" variant="dark" className="flex gap-3">
    //         <FolderPlus size={20} />
    //         <span>New Folder</span>
    //       </Button>
    //     </>
    //   )}
    //   {router.pathname == '/dashboard/projects' && <CreateProjectButton />}

    //   {router.pathname == '/dashboard/trash' && (
    //     <>
    //       <Button variant="dark" size="md" className="flex gap-3">
    //         <Trash size={20} />
    //         Empty Bin
    //       </Button>
    //     </>
    //   )}
    // </div>
  );
}
export { Actionbar };
