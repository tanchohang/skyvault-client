import { Button } from '@tanchohang/langtang-rcl';
import { FolderPlus, Upload } from 'lucide-react';

interface Props {}
function Actionbar({}: Props) {
  return (
    <div className=" flex flex-row-reverse gap-5 p-5">
      <Button size="md" variant="dark" className="flex gap-3">
        <Upload size={20} />
        <span>Upload</span>
      </Button>
      <Button size="md" variant="dark" className="flex gap-3">
        <FolderPlus size={20} />
        <span>New Folder</span>
      </Button>
      <Button size="md" variant="dark" className="flex gap-3">
        <FolderPlus size={20} />
        <span>Create Project</span>
      </Button>
    </div>
  );
}
export default Actionbar;
