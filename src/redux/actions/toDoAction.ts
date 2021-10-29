import api from "../../api";
import { Dispatch } from "redux";
import { ADD_TODO, DELETE_TODO, GET_TODOS, TODO_ERROR } from "./types";

export const addToDo = (data: any) => async (dispatch: Dispatch) => {
  try {
    const res = await api.post(`/todos`, data);

    dispatch({
      type: ADD_TODO,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response },
    });
  }
};

export const getToDos = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get(`/todos?page=1&limit=20`);

    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response },
    });
  }
};

export const deleteToDo = (todoId: string) => async (dispatch: Dispatch) => {
  try {
    const res = await api.delete(`/todos/${todoId}`);

    dispatch({
      type: DELETE_TODO,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response },
    });
  }
};

export const editToDo =
  (id: string, message: string, completed: boolean) =>
  async (dispatch: Dispatch) => {
    try {
      const data = { id, message, completed };
      await api.patch(`/todos/${id}`, data);

      const res = await api.get(`/todos?page=1&limit=20`);

      dispatch({
        type: GET_TODOS,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch({
        type: TODO_ERROR,
        payload: { msg: err.response },
      });
    }
  };
