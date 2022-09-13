import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Listwords from "../components/Listwords";
import Search from "../components/Search";
import URL_API from "../utils/env";

const Home: NextPage = () => {
  const [listWords, setListWords] = useState([]);
  const [showNotes, setShowNotes] = useState(false);

  const getInfo = async (q = null) => {
    try {
      let res: any = {};
      if (showNotes) {
        res = await fetch(`${URL_API}/note/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(q),
        });
        res = await res.json();

        res = res.map((item: any) => {
          return {
            ...item,
            hideAllText: true,
          };
        });
      } else {
        res = await fetch(`${URL_API}/word/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(q),
        });
        res = await res.json();
      }
      setListWords(res);
    } catch (err) {}
  };

  useEffect(() => {
    getInfo();
  }, [showNotes]);

  const handlerSearch = (q = null) => {
    getInfo(q);
  };

  const handlerCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setShowNotes(value);
  };

  return (
    <main>
      <Header onSearch={handlerSearch} />
      <div>
        Show notes{" "}
        <input
          type="checkbox"
          checked={!!showNotes}
          onChange={handlerCheckbox}
        />
      </div>
      <Search onSearch={handlerSearch} />
      <Listwords listWords={listWords} showNotes={showNotes} setListWords={setListWords} />
    </main>
  );
};

export default Home;
