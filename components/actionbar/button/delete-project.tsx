import { Button } from '@tanchohang/langtang-rcl';
import { useDashboardContext } from 'context/dashboardContext';
import * as projectService from 'lib/services/project.service';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/router';
import { PojectActions } from 'reducers/projects.reducers';

interface Props {}
const DeleteProjectButton = ({}: Props) => {
  const router = useRouter();
  const { state, dispatch } = useDashboardContext();

  const deleteProject = async (id: string) => {
    try {
      console.log(id);
      const deleted = await projectService.deleteProject({ id });
      console.log(deleted);
      dispatch({ type: PojectActions.DELETE_PROJECT_SUCCESS, payload: id });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      variant="destructive"
      size="md"
      className="flex gap-3"
      onClick={async () => {
        await deleteProject(state.projectState.currentProject as string);
        router.push('/dashboard/projects');
      }}
    >
      <Trash size={20} />
      Delete Project
    </Button>
  );
};
export default DeleteProjectButton;
