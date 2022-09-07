import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Listwords from "../components/Listwords";
import Search from "../components/Search";
import URL_API from "../utils/env";

const Home: NextPage = () => {
  const [listWords, setListWords] = useState([]);

  const getInfo = async (q = null) => {
    try {
      let res: any = await fetch(`${URL_API}/word/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(q),
      });
      res = await res.json();
      setListWords(res);
    } catch (err) {}
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handlerSearch = (q = null) => {
    getInfo(q);
  };

  return (
    <main>
      <Header onSearch={handlerSearch} />
      <Search onSearch={handlerSearch} />
      <Listwords listWords={listWords} />
    </main>
  );
};

export default Home;
