import React, { useRef } from "react";
import Modal from "@mui/material/Modal";
import { DELETE_TODO_MODAL } from "../redux/actions/types";

interface ModalProps {
  isOpen: boolean;
  onModalHandler: any;
  onModalClose: any;
  type: string;
  inputValue?: string;
}

const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onModalHandler,
  onModalClose,
  type,
  inputValue,
}) => {
  const message: any = useRef();

  const displayInputFields = type === DELETE_TODO_MODAL;

  return (
    <Modal onClose={onModalClose} open={isOpen}>
      <div>
        <div className="modal">
          {displayInputFields ? (
            <>
              <span>Really want to delete?</span>
              <p>
                <button
                  className="ok"
                  onClick={() => onModalHandler(DELETE_TODO_MODAL)}
                >
                  OK
                </button>
                <button onClick={onModalClose}>Cancel</button>
              </p>
            </>
          ) : (
            <form onSubmit={() => onModalHandler(message?.current?.value)}>
              <label htmlFor="name">To Do Name:</label>
              <input
                autoFocus
                defaultValue={inputValue}
                type="text"
                minLength={2}
                maxLength={64}
                ref={message}
                id="name"
              />
              <div>
                <button type="submit" className="ok">
                  OK
                </button>
                <button onClick={onModalClose}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
