import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import { FileActionType, fileReducer, FileStateType, initialFilesState } from 'reducers/files.reducers';
import { initialProjectsState, ProjectActionType, projectReducer, ProjectStateType } from 'reducers/projects.reducers';

type StateType = {
  projectState: ProjectStateType;
  fileState: FileStateType;
};
export type ActionType = ProjectActionType | FileActionType;

const initialState: StateType = {
  projectState: initialProjectsState,
  fileState: initialFilesState,
};

// export const useDashboardContext = (initialState: StateType) => {
//   // const [state, dispatch] = useReducer(reducer, initialState);

//   // const create = (project: ProjectType) =>
//   //   dispatch({ type: REDUCER_ACTION_TYPE.CREATE });

//   return createContext(DashboardContext);
// };

interface DashboardContextType {
  state: StateType;
  dispatch: Dispatch<ActionType>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const reducer = (state: StateType, action: ActionType): StateType => {
  return {
    projectState: projectReducer(state.projectState, action as ProjectActionType),
    fileState: fileReducer(state.fileState, action as FileActionType),
  };
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <DashboardContext.Provider value={{ state, dispatch }}>{children}</DashboardContext.Provider>;
};

export const useDashboardContext = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};
