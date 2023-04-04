export type ProjectType = { name: string; id?: string };

export type ProjectStateType = { projects: ProjectType[]; isLoading: boolean; isError: boolean; currentProject?: string };

export const initialProjectsState: ProjectStateType = {
  projects: [],
  currentProject: undefined,
  isLoading: false,
  isError: false,
};

export const enum PojectActions {
  FETCH_PROJECTS_LOADING = 'FETCH_PROJECTS_LOADING',
  FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS',
  FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR',
  CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS',
  UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS',
  DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS',
  SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT',
  UNSET_CURRENT_PROJECT = 'UNSET_CURRENT_PROJECT',
}

export type ProjectActionType =
  | { type: PojectActions.FETCH_PROJECTS_SUCCESS; payload: ProjectType[] }
  | { type: PojectActions.FETCH_PROJECTS_ERROR }
  | { type: PojectActions.FETCH_PROJECTS_LOADING }
  | { type: PojectActions.CREATE_PROJECT_SUCCESS; payload: ProjectType }
  | { type: PojectActions.UPDATE_PROJECT_SUCCESS; payload: ProjectType }
  | { type: PojectActions.DELETE_PROJECT_SUCCESS; payload: string }
  | { type: PojectActions.SET_CURRENT_PROJECT; payload: string }
  | { type: PojectActions.UNSET_CURRENT_PROJECT };

export const projectReducer = (state: ProjectStateType, action: ProjectActionType): ProjectStateType => {
  switch (action.type) {
    case PojectActions.FETCH_PROJECTS_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case PojectActions.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        isLoading: false,
        isError: false,
      };
    case PojectActions.FETCH_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case PojectActions.CREATE_PROJECT_SUCCESS:
      return { ...state, projects: [...state.projects, { id: action.payload.id, name: action.payload.name }] };

    case PojectActions.UPDATE_PROJECT_SUCCESS:
      return { ...state, projects: state.projects.map((p) => (p.id === action.payload.id ? action.payload : p)) };

    case PojectActions.DELETE_PROJECT_SUCCESS:
      return { ...state, projects: state.projects.filter((p) => p.id !== action.payload) };

    case 'SET_CURRENT_PROJECT':
      return { ...state, currentProject: action.payload };
    case 'UNSET_CURRENT_PROJECT':
      return { ...state, currentProject: undefined };

    default:
      return state;
  }
};
