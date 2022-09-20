import styles from "./List.module.scss";
import classNames from "classnames";
import eyeOpen from "../public/eye-open.svg";
import eyeClose from "../public/eye-close.svg";
import Image from "next/image";

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
                {!showNotes ? (
                  <>
                    &bull; &nbsp;
                    <span>
                      {item.text_en}: {item.text_es}
                    </span>
                  </>
                ) : item.hideAllText ? (
                  <>
                    &bull; &nbsp;
                    <span>
                      {item.title}: {item.text}
                      <span className={styles["Eye"]}>
                        <Image
                          src={eyeOpen}
                          alt={"alt"}
                          width={16}
                          height={16}
                          layout="intrinsic"
                        />
                      </span>
                    </span>
                  </>
                ) : (
                  <div className={styles["Rendered-Text"]}>
                    <span>&bull; {item.title}:</span>{" "}
                    <span className={styles["Eye"]}>
                      <Image
                        src={eyeClose}
                        alt={"alt"}
                        width={16}
                        height={16}
                        layout="intrinsic"
                      />
                    </span>
                    <pre>{" \n" + item.text}</pre>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    </section>
  );
}

export default Listwords;
