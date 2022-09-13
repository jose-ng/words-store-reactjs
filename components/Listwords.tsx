import styles from "./List.module.scss";
import classNames from "classnames";

function Listwords({ listWords = [], showNotes, setListWords }: any) {
  const handlerList = (item: any, newValueForHideAllText: boolean) => {
    const listWordsNew = listWords.map((x: any) => {
      return {
        ...x,
        hideAllText:
          x._id === item._id ? newValueForHideAllText : x.hideAllText,
      };
    });
    setListWords(listWordsNew);
  };

  return (
    <section className={styles.ListContainer}>
      <ul>
        {listWords.length > 0 &&
          listWords.map((item: any) => {
            const classItem = item.hideAllText
              ? classNames(styles["Item"], styles["Item_HideAllText"])
              : styles["Item"];
            return (
              <li
                className={classItem}
                key={item._id}
                onClick={() => {
                  handlerList(item, !item.hideAllText);
                }}
              >
                &bull; {showNotes ? item.title : item.text_en} -{" "}
                {showNotes ? item.text : item.text_es}
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default Listwords;
