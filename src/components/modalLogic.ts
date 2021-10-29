import { store } from "../redux/store";
import { EDIT_TODO_MODAL, DELETE_TODO_MODAL } from "../redux/actions/types";
import { editToDo, deleteToDo } from "../redux/actions/toDoAction";

const modalLogic = (
  message: string,
  modalType: string,
  selectedToDoId: string,
  completed: boolean
) => {
  switch (modalType) {
    case EDIT_TODO_MODAL:
      message &&
        store.dispatch(editToDo(selectedToDoId, message, completed) as any);
      break;
    case DELETE_TODO_MODAL:
      store.dispatch(deleteToDo(selectedToDoId) as any);
      break;
    default:
      break;
  }
};

export default modalLogic;
