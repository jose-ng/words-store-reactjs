// import React, { useState } from "react";
// import CreateNote from "./CreateNote";
// import CreateWord from "./CreateWord";


import styles from "./Header.module.scss";
interface Props {
  children: React.ReactNode;
  
}
function Header({ children }: Props) {
  // const [showCreateBtn, setShowCreateBtn] = useState(false);
  // const [showNoteBtn, setShowNoteBtn] = useState(false);
  // const handlerCancel = () => {
  //   setShowNoteBtn(false);
  //   setShowCreateBtn(false);
  // };
  return (
    <>
      <header className={styles.Wrapper}>
        {children}
        {/* <nav>
          {!showCreateBtn && !showNoteBtn && (
            <button
              type="button"
              onClick={() => {
                setShowCreateBtn(true);
              }}
            >
              Add Word
            </button>
          )}{" "}
          {!showCreateBtn && !showNoteBtn && (
            <button
              type="button"
              onClick={() => {
                setShowNoteBtn(true);
              }}
            >
              Add Note
            </button>
          )}
          {showCreateBtn && (
            <>
              <h4>Add Word</h4>
              <CreateWord
                onCancel={handlerCancel}
                onSearch={onSearch}
                ip={ip}
              />
            </>
          )}
          {showNoteBtn && (
            <>
              <h4>Add Note</h4>
              <CreateNote
                onCancel={handlerCancel}
                onSearch={onSearch}
                ip={ip}
              />
            </>
          )}
          {(showCreateBtn || showNoteBtn) && (
            <button type="button" onClick={handlerCancel}>
              Cancel
            </button>
          )}
        </nav> */}
      </header>
    </>
  );
}

export default Header;
