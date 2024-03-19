"use client"
import { useState } from "react";

function useModal() {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const modalOpenHandler: () => void = () => {
    setModalIsOpen(true);
  };

  const modalCloseHanlder: () => void = () => {
    setModalIsOpen(false);
  };
  return {
    modalIsOpen,
    modalOpenHandler,
    modalCloseHanlder,
  };
}

export { useModal };
