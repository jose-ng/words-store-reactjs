import styles from "./NavLinks.module.scss";

function NavLinks({ onOptionHandler }: any) {
  return (
    <ul className={styles.Controls}>
      <li>
        <button type="button" onClick={() => onOptionHandler("word")}>
          Add Word
        </button>
      </li>
      <li>
        <button type="button" onClick={() => onOptionHandler("note")}>
          Add Note
        </button>
      </li>
    </ul>
  );
}

export default NavLinks;
