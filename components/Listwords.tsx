import styles from "./List.module.scss";
import classNames from "classnames";
import eyeOpen from "../public/eye-open.svg";
import eyeClose from "../public/eye-close.svg";
import Image from "next/image";
import { useState } from "react";
import URL_API from "../utils/env";

function Listwords({ listWords = [], showNotes, setListWords, ip }: any) {
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handlerUpdateRatingWord = async (data: any) => {
    setErrorMsg("");
    try {
      if (sending) return;
      setSending(true);
      data.ip = ip;
      const res = await fetch(`${URL_API}/word/updateRating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSending(false);
      } else {
        setSending(false);
        if (res.status === 403) setErrorMsg("Action not allowed");
      }
    } catch (err) {
      setSending(false);
      setErrorMsg("Server error");
    }
  };

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
          listWords.map((item: any, index: any) => {
            const classItem = item.hideAllText
              ? classNames(styles["Item"], styles["Item_HideAllText"])
              : styles["Item"];
            return (
              <li className={classItem} key={item._id + "_" + index}>
                {!showNotes && (
                  <>
                    <button
                      disabled={sending}
                      type="button"
                      onClick={() =>
                        handlerUpdateRatingWord({ id: item._id, rating: 1 })
                      }
                    >
                      &#8593;
                    </button>
                    <button
                      disabled={sending}
                      type="button"
                      onClick={() =>
                        handlerUpdateRatingWord({ id: item._id, rating: -1 })
                      }
                    >
                      &#8595;
                    </button>
                  </>
                )}
                {item.hideAllText ? (
                  <>
                    &bull; &nbsp;
                    <span>
                      {showNotes ? item.title : item.text_en}:{" "}
                      {showNotes ? item.text : item.text_es}
                      <span
                        className={styles["Eye"]}
                        onClick={() => {
                          handlerList(item, !item.hideAllText);
                        }}
                      >
                        {!showNotes && <span>{(item.rating || 0) + " "}</span>}
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
                    <span
                      className={styles["Eye"]}
                      onClick={() => {
                        handlerList(item, !item.hideAllText);
                      }}
                    >
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
