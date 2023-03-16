import { LucideIcon, SidemenuItemTitle } from '@tanchohang/langtang-rcl';
import Link from 'next/link';
import {
  Folder,
  FolderPlus,
  Folders,
  FolderTree,
  Trash,
  Upload,
} from 'lucide-react';

interface Props {}
const Sidemenu = (props: Props) => {
  return (
    <div className="h-screen w-[200px] bg-slate-300 flex flex-col shadow-inner pt-5">
      <span className="p-5">Tanchohang Limbu</span>
      <Link
        href="/dashboard"
        className="flex gap-5 hover:bg-slate-100 w-full p-3"
      >
        <LucideIcon icon={<Folders size={20} />} />
        <SidemenuItemTitle title="Files" />
      </Link>

      <Link
        href="/dashboard/projects"
        className="flex gap-5 hover:bg-slate-100 w-full p-3"
      >
        <LucideIcon icon={<FolderTree size={20} />} />
        <SidemenuItemTitle title="Projects" />
      </Link>

      <Link
        href="/dashboard/trash"
        className="flex gap-5 hover:bg-slate-100 w-full p-3"
      >
        <Trash size={20} />
        <span>Trash</span>
      </Link>
    </div>
  );
};
export default Sidemenu;
