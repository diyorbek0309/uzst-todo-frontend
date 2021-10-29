import "./App.css";
import React from "react";
import Form from "./components/Form";
import ToDoItem from "./components/ToDoItem";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToDo, getToDos, editToDo } from "./redux/actions/toDoAction";
import modalLogic from "./components/modalLogic";
import ModalComponent from "./components/ModalComponent";
import { EDIT_TODO_MODAL, DELETE_TODO_MODAL } from "./redux/actions/types";
import Loader from "./components/Loader";

export interface IToDo {
  id: number;
  message: string;
  completed: boolean;
  _id: string;
}

const MainContainer = React.memo(() => {
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedToDoId, setSelectedToDoId] = useState("");
  const dispatch = useDispatch();
  let toDos: IToDo[] = useSelector((state: any) => state.toDo.toDos);
  let loading: boolean = useSelector((state: any) => state.loading);

  useEffect(() => {
    dispatch(getToDos());
  }, [dispatch]);

  const modalHandler = (text?: string, type?: string) => {
    setIsOpen(false);
    if (text) modalLogic(text, modalType, selectedToDoId, completed);
    if (type) modalLogic(message, type, selectedToDoId, completed);
  };

  const onModalClose = () => {
    setIsOpen(false);
  };

  const handleEdit = (todoId: string, message: string, completed: boolean) => {
    setModalType(EDIT_TODO_MODAL);
    setSelectedToDoId(todoId);
    setCompleted(completed);
    setIsOpen(true);
  };

  const handleDelete = (todoId: string) => {
    setModalType(DELETE_TODO_MODAL);
    setSelectedToDoId(todoId);
    setIsOpen(true);
  };

  const handleComplete = (
    todoId: string,
    message: string,
    completed: boolean
  ) => {
    dispatch(editToDo(todoId, message, completed));
  };

  const handleInput = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const id = uuidv4();
    const data = { id, message, completed: false };
    dispatch(addToDo(data));
    setMessage("");
  };

  let inputValue = toDos.find((toDo) => toDo._id === selectedToDoId);

  return (
    <>
      {isOpen && (
        <ModalComponent
          isOpen={isOpen}
          onModalHandler={modalHandler}
          onModalClose={onModalClose}
          type={modalType}
          inputValue={inputValue?.message}
        />
      )}
      <h1 className="title">To Do Application</h1>
      <Form
        value={message}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
      <div>
        {loading ? (
          <Loader />
        ) : (
          <ul>
            {toDos.length ? (
              toDos.map((toDo: IToDo) => (
                <ToDoItem
                  key={toDo.id}
                  id={toDo._id}
                  message={toDo.message}
                  completed={toDo.completed}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleComplete={handleComplete}
                />
              ))
            ) : (
              <div>
                <h3>You haven't added ToDos yet!</h3>
              </div>
            )}
          </ul>
        )}
      </div>
    </>
  );
});

export default MainContainer;
