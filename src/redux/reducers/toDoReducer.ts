import {
  GET_TODOS,
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  TODO_ERROR,
} from "../actions/types";
import { IToDo } from "../../MainContainer";

const initialState: {
  toDos: IToDo[];
  toDo: any;
  loading: boolean;
  error: any;
} = {
  toDos: [],
  toDo: null,
  loading: true,
  error: {},
};

function toDoReducer(state = initialState, action: any) {
  const { type, payload } = action;

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        toDos: payload.data,
        loading: false,
      };
    case EDIT_TODO:
      return {
        ...state,
        toDos: [...state.toDos, payload.data],
        loading: false,
      };
    case ADD_TODO:
      return {
        ...state,
        toDos: [...state.toDos, payload.data],
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        toDos: state.toDos.filter((toDo: any) => toDo._id !== payload.data._id),
        loading: false,
      };
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default toDoReducer;
