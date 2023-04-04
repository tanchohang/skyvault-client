import { Actionbar } from 'components/actionbar';
import CreateProjectButton from 'components/actionbar/button/create-project';
import AppFolder from 'components/folder';
import { useDashboardContext } from 'context/dashboardContext';
import { getAllProject } from 'lib/services/project.service';
import { useEffect } from 'react';
import { PojectActions } from 'reducers/projects.reducers';
import useSWR from 'swr';

interface Props {}
export default function Project({}: Props) {
  const { state, dispatch } = useDashboardContext();
  const { data, isLoading, error } = useSWR('/projects', getAllProject);

  useEffect(() => {
    dispatch({ type: PojectActions.FETCH_PROJECTS_LOADING });
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      dispatch({
        type: PojectActions.FETCH_PROJECTS_ERROR,
      });
    }
    if (data) {
      dispatch({ type: PojectActions.FETCH_PROJECTS_SUCCESS, payload: data.data.map((p: any) => ({ id: p._id, name: p.name })) });
    }
  }, [data, error, dispatch]);

  return (
    <>
      <Actionbar>
        <CreateProjectButton />
      </Actionbar>
      <div className="flex flex-wrap gap-5">
        {state.projectState.projects.map((project: any) => (
          <div
            key={project.name}
            onClick={() => {
              dispatch({ type: PojectActions.SET_CURRENT_PROJECT, payload: project.id });
            }}
          >
            {project?.id}
            <AppFolder url={`/dashboard/projects/${project.name}`} nameFromApi={project.name} id={project?.id} />
          </div>
        ))}
      </div>
    </>
  );
}
Project.auth = true;
Project.page = 'project';
