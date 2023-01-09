import { useState } from "react";

function useModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalOpenHandler = () => {
    setModalIsOpen(true);
  };

  const modalCloseHanlder = () => {
    setModalIsOpen(false);
  };
  return {
    modalIsOpen,
    modalOpenHandler,
    modalCloseHanlder,
  };
}

export default useModal;
