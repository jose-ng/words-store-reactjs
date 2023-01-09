import { useState } from "react";
import useCreate from "../../hooks/useCreate";
import useHeader from "../../hooks/useCreate";
import useModal from "../../hooks/useModal";
import useStateWords from "../../hooks/useStateWords";
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
  const {
    listWords,
    setListWords,
    showNotes,
    setShowNotes,
    nextResults,
    setNextResults,
    ip,
    setIp,
    totalRecords,
    setTotalRecords,
    totalShowRecords,
    setTotalShowRecords,
    query,
    setQuery,
    limitResult,
    setLimitResult,
    loading,
    setLoading,
    error,
    setError,
    getInfo,
  } = useStateWords();

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

  const chooseCreateOptionHandler = (option: string) => {
    setCreateOption(option);
    modalOpenHandler();
  };

  return (
    <main className={styles["Layout"]}>
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
          createOption={createOption}
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

export default Layout;
