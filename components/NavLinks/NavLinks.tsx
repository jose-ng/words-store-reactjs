function NavLinks({ onOptionHandler }: any) {
  return (
    <ul className="flex">
      <li >
        <button type="button" onClick={() => onOptionHandler("word")}>
          Add Word
        </button>
      </li>
      <li className="pl-3">
        <button type="button" onClick={() => onOptionHandler("note")}>
          Add Note
        </button>
      </li>
    </ul>
  );
}

export default NavLinks;
