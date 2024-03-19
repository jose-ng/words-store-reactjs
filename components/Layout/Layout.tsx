"use client"
import { useModal } from "@hooks/useModal";
import { useCreate } from "@hooks/useCreate";
import ContainerCreate from "../ContainerCreate/ContainerCreate";
import CreateNote from "../CreateNote/CreateNote";
import CreateWord from "../CreateWord/CreateWord";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Header from "../Header/Header";
import Logo from "../Logo/Logo";
import Modal from "../Modal/Modal";
import Nav from "../Nav/Nav";
import NavLinks from "../NavLinks/NavLinks";
import styles from "./Layout.module.scss";

function Layout({ children }: any) {
  const { modalIsOpen, modalCloseHanlder, modalOpenHandler } = useModal();
  const {
    handlerSubmit,
    handlerChangeValue,
    form,
    resetValues,
    sending,
    errorCreate,
    createOption,
    setCreateOption,
  } = useCreate();

  const chooseCreateOptionHandler = (option: "word" | "note" | "") => {
    setCreateOption(option);
    modalOpenHandler();
  };

  return (
    <main className={styles["Layout"]}>
      {children}
      <Header>
        <Nav>
          <Logo />
          <NavLinks onOptionHandler={chooseCreateOptionHandler} />
        </Nav>
      </Header>
      {children}
      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          resetValues();
          modalCloseHanlder();
        }}
      >
        <ContainerCreate
          error={errorCreate}
          onError={() => <ErrorMessage msg={errorCreate} />}
        >
          {createOption === "word" && (
            <CreateWord
              onSubmit={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                handlerSubmit("word/add");
              }}
              onChangeValue={handlerChangeValue}
              form={form}
              sending={sending}
            />
          )}
          {createOption === "note" && (
            <CreateNote
              onSubmit={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                handlerSubmit("note/add");
              }}
              onChangeValue={handlerChangeValue}
              form={form}
              sending={sending}
            />
          )}
        </ContainerCreate>
      </Modal>
    </main>
  );
}

export { Layout };
