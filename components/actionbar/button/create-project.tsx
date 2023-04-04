import { Button } from '@tanchohang/langtang-rcl';
import { useDashboardContext } from 'context/dashboardContext';
import { createProject as createProjectService } from 'lib/services/project.service';
import { FolderPlus } from 'lucide-react';
import { PojectActions } from 'reducers/projects.reducers';

interface Props {}
function CreateProjectButton({}: Props) {
  const { state, dispatch } = useDashboardContext();
  const createProject = async () => {
    try {
      const response = await createProjectService({ name: `project-${Date.now()}` });

      dispatch({ type: PojectActions.CREATE_PROJECT_SUCCESS, payload: { id: response.data._id, name: response.data.name } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <Button size="md" variant="dark" className="flex gap-3" onClick={createProject}>
      <FolderPlus size={20} />
      <span>Create Project</span>
    </Button>
  );
}
export default CreateProjectButton;
