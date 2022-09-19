import type { NextPage } from "next";
import { CSSProperties, useEffect, useState } from "react";
import Header from "../components/Header";
import Listwords from "../components/Listwords";
import Search from "../components/Search";
import URL_API from "../utils/env";

const Home: NextPage = () => {
  const [listWords, setListWords] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const [ip, setIp] = useState("");

  useEffect(() => {
    const getIp = async () => {
      try {
        const res = await fetch(
          "https://ipgeolocation.abstractapi.com/v1/?api_key=fdbbbaefc0114c39afb9109fbf3024cc"
        );
        const ipObj = await res.json();
        setIp(ipObj.ip_address);
      } catch {
        console.log("error IP");
      }
    };
    getIp();
  }, []);

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
    setListWords([]);
    getInfo();
  }, [showNotes]);

  const handlerSearch = (q = null) => {
    getInfo(q);
  };

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === "ipBox") {
      const value = e.target.value;
      setIp(value);
    } else {
      const value = e.target.checked;
      setShowNotes(value);
    }
  };

  const ipStyle: CSSProperties = {
    maxWidth: "1024px",
    margin: "0 auto",
  };

  return (
    <>
      <main>
        <Header onSearch={handlerSearch} ip={ip} />
        <div>
          Show notes{" "}
          <input
            type="checkbox"
            checked={!!showNotes}
            onChange={handlerInput}
          />
        </div>
        <Search onSearch={handlerSearch} />
        <Listwords
          listWords={listWords}
          showNotes={showNotes}
          setListWords={setListWords}
        />
      </main>
      {listWords.length > 0 && (
        <div style={ipStyle}>
          <span className="ip">{ip || ":/ "} </span>
          {!ip && (
            <input
              name="ipBox"
              placeholder="Set Code"
              onChange={handlerInput}
            ></input>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
