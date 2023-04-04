import { Button } from '@tanchohang/langtang-rcl';
import { Trash } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}
const EmptyTrashButton = ({ ...props }: Props) => {
  return (
    <Button variant="dark" size="md" className="flex gap-3" {...props}>
      <Trash size={20} />
      Empty Bin
    </Button>
  );
};
export default EmptyTrashButton;
