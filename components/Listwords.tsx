function Listwords({ listWords = [], showNotes }: any) {
  return (
    <ul>
      {listWords.length > 0 &&
        listWords.map(({ _id, text_es, text_en, title, text }: any) => {
          return (
            <li key={_id}>
              {showNotes ? title : text_en} - {showNotes ? text : text_es}
            </li>
          );
        })}
    </ul>
  );
}

export default Listwords;
