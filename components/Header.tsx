import React, { useState } from "react";
import CreateWord from "./CreateWord";
import styles from "./Header.module.scss";

function Header({ onSearch }: any) {
  const [showCreate, setShowCreate] = useState(false);
  const handlerAddWord = () => {
    setShowCreate(!showCreate);
  };
  return (
    <>
      <header className={styles.HeaderContainer}>
        <h1>Eng Words</h1>
        <nav>
          <button type="button" onClick={handlerAddWord}>
            {`${!showCreate ? "Add Word" : "Cancel"}`}
          </button>
          {showCreate && (
            <CreateWord setShowCreate={setShowCreate} onSearch={onSearch} />
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
