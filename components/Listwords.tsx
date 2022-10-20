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
                {item.hideAllText ? (
                  <>
                    &bull; &nbsp;
                    <span>
                      {showNotes ? item.title : item.text_en}:{" "}
                      {showNotes ? item.text : item.text_es}
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
                    <span>&bull; {showNotes ? item.title : item.text_en}:</span>{" "}
                    <span className={styles["Eye"]}>
                      <Image
                        src={eyeClose}
                        alt={"alt"}
                        width={16}
                        height={16}
                        layout="intrinsic"
                      />
                    </span>
                    <pre>
                      {" \n" + (showNotes ? item.text : item.text_es)}
                      {item.urlImg && (
                        <div>
                          <Image
                            src={item.urlImg}
                            alt={"alt"}
                            width={0}
                            height={0}
                            layout="responsive"
                          />
                        </div>
                      )}
                    </pre>
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
