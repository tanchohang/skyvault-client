export type FileType = {
  name: string;
  id?: string;
  project: string;
  user: string;
  path: string;
  fileName: string;
  link?: string;
  mimeType: string;
  deleted: boolean;
  archived: boolean;
  originalName: string;
  createdAt: string;
  updatedAt: string;
};

export type FileStateType = { files: FileType[]; trashed: FileType[]; isLoading: boolean; isError: boolean; currentFile?: string };

export const initialFilesState: FileStateType = {
  files: [],
  trashed: [],
  currentFile: undefined,
  isLoading: false,
  isError: false,
};

export const enum FileActions {
  FETCH_FILES_LOADING = 'FETCH_FILES_LOADING',
  FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS',
  FETCH_TRASHED_SUCCESS = 'FETCH_TRASHED_SUCCESS',
  FETCH_FILES_ERROR = 'FETCH_FILES_ERROR',
  ADD_FILES_SUCCESS = 'ADD_FILES_SUCCESS',
  UPDATE_FILE_SUCCESS = 'UPDATE_FILE_SUCCESS',
  DELETE_FILE_SUCCESS = 'DELETE_FILE_SUCCESS',
  EMPTY_TRASH_SUCCESS = 'EMPTY_TRASH_SUCCESS',
  RESTORE_FILE_SUCCESS = 'RESTORE_FILE_SUCCESS',
  TRASH_FILE_SUCCESS = 'TRASH_FILE_SUCCESS',
  SET_CURRENT_FILE = 'SET_CURRENT_FILE',
  UNSET_CURRENT_FILE = 'UNSET_CURRENT_FILE',
}

export type FileActionType =
  | { type: FileActions.FETCH_FILES_SUCCESS; payload: FileType[] }
  | { type: FileActions.FETCH_TRASHED_SUCCESS; payload: FileType[] }
  | { type: FileActions.FETCH_FILES_ERROR }
  | { type: FileActions.FETCH_FILES_LOADING }
  | { type: FileActions.ADD_FILES_SUCCESS; payload: FileType[] }
  | { type: FileActions.UPDATE_FILE_SUCCESS; payload: FileType }
  | { type: FileActions.DELETE_FILE_SUCCESS; payload: string }
  | { type: FileActions.EMPTY_TRASH_SUCCESS }
  | { type: FileActions.RESTORE_FILE_SUCCESS; payload: string }
  | { type: FileActions.TRASH_FILE_SUCCESS; payload: string }
  | { type: FileActions.SET_CURRENT_FILE; payload: string }
  | { type: FileActions.UNSET_CURRENT_FILE };

export const fileReducer = (state: FileStateType, action: FileActionType): FileStateType => {
  switch (action.type) {
    case FileActions.FETCH_FILES_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FileActions.FETCH_FILES_SUCCESS:
      return {
        ...state,
        files: action.payload,
        isLoading: false,
        isError: false,
      };
    case FileActions.FETCH_FILES_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case FileActions.ADD_FILES_SUCCESS:
      return { ...state, files: [...state.files.concat(action.payload)] };

    case FileActions.UPDATE_FILE_SUCCESS:
      return { ...state, files: state.files.map((p) => (p.id === action.payload.id ? action.payload : p)) };

    case FileActions.DELETE_FILE_SUCCESS:
      return { ...state, files: state.files.filter((p) => p.id !== action.payload) };

    case FileActions.EMPTY_TRASH_SUCCESS:
      return { ...state, files: state.files.filter((p) => p.deleted === false) };

    case FileActions.TRASH_FILE_SUCCESS:
      return {
        ...state,
        files: state.files.map((p) => {
          if (p.id === action.payload) {
            p.deleted = true;
          }
          return p;
        }),
      };
    case FileActions.RESTORE_FILE_SUCCESS:
      return {
        ...state,
        files: state.files.map((p) => {
          if (p.id === action.payload) {
            p.deleted = false;
          }
          return p;
        }),
      };
    case 'SET_CURRENT_FILE':
      return { ...state, currentFile: action.payload };
    case 'UNSET_CURRENT_FILE':
      return { ...state, currentFile: undefined };

    default:
      return state;
  }
};
