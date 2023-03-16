import { Folder } from 'lucide-react';
import Link from 'next/link';

interface Props {}
function AppFolder({}: Props) {
  return (
    <div className="p-10 flex gap-5">
      <Link
        href=""
        className="hover:text-red-500 hover:bg-black hover:shadow-xl h-[100px] w-[100px] border-2 border-black flex items-center justify-center"
      >
        <Folder size={50} />
      </Link>
    </div>
  );
}
export default AppFolder;
