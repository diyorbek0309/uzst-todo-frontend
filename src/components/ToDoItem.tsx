import classes from "./ToDoItem.module.css";
import change_icon from "../assets/change_icon.png";
import complete_icon from "../assets/complete_icon.png";
import uncomplete_icon from "../assets/uncomplete_icon.png";
import delete_icon from "../assets/delete_icon.png";

type ToDoItemProps = {
  id: string;
  message: string;
  completed: boolean;
  handleEdit: any;
  handleComplete: any;
  handleDelete: any;
};

const ToDoItem = ({
  id,
  message,
  completed,
  handleEdit,
  handleComplete,
  handleDelete,
}: ToDoItemProps) => {
  return (
    <div className={classes.todo_item}>
      <p className={classes.todo_item__name}>
        {completed ? <del>{message}</del> : message}
      </p>
      <div>
        <button
          className={classes.todo_item__button}
          onClick={() => handleEdit(id, message, completed)}
        >
          <img src={change_icon} alt="Edit" />
        </button>
        <button
          className={classes.todo_item__button}
          onClick={() => handleComplete(id, message, !completed)}
        >
          {completed ? (
            <img src={uncomplete_icon} alt="Uncomplete" />
          ) : (
            <img src={complete_icon} alt="Complete" />
          )}
        </button>
        <button
          className={classes.todo_item__button}
          onClick={() => handleDelete(id)}
        >
          <img src={delete_icon} alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default ToDoItem;
