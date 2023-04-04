import { Button } from '@tanchohang/langtang-rcl';
import { useDashboardContext } from 'context/dashboardContext';
import { FolderPlus } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}
function NewFolderButton({ ...props }: Props) {
  return (
    <Button size="md" variant="dark" className="flex gap-3" {...props}>
      <FolderPlus size={20} />
      <span>NewFolder</span>
    </Button>
  );
}
export default NewFolderButton;
