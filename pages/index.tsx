import useStateWords from "../hooks/useStateWords";
import type { NextPage } from "next";
import { useEffect } from "react";
import Header from "../components/Header/Header";
import Listwords from "../components/Listwords";
import Search from "../components/Search";
import Logo from "../components/Logo/Logo";
import Nav from "../components/Nav/Nav";
import NavLinks from "../components/NavLinks/NavLinks";
import Layout from "../components/Layout/Layout";
import Modal from "../components/Modal/Modal";
import useModal from "../hooks/useModal";

const Home: NextPage = () => {
  
  const {
    listWords,
    setListWords,
    showNotes,
    setShowNotes,
    nextResults,
    setNextResults,
    ip,
    setIp,
    totalRecords,
    setTotalRecords,
    totalShowRecords,
    setTotalShowRecords,
    query,
    setQuery,
    limitResult,
    setLimitResult,
    loading,
    setLoading,
    error,
    setError,
    getInfo,
  } = useStateWords();

  // const handlerSearch = (q = null, reload = false) => {
  //   setTotalRecords(0);
  //   setQuery(q);
  //   setListWords([]);
  //   setNextResults(0);
  //   if (reload) getInfo();
  // };

  // useEffect(() => {
  //   getInfo();
  // }, [nextResults, query]);

  // const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const name = e.target.name;
  //   if (name === "ipBox") {
  //     const value = e.target.value;
  //     setIp(value);
  //   } else {
  //     const value = e.target.checked;
  //     setShowNotes(value);
  //   }
  // };

  return (
    <Layout>
      {/* <Header onSearch={handlerSearch} ip={ip} />
      <div>
        Show notes{" "}
        <input type="checkbox" checked={!!showNotes} onChange={handlerInput} />
      </div>
      <Search showNotes={showNotes} onSearch={handlerSearch} />
      {!showNotes && (
        <span>
          {" Total show words: " +
            (totalShowRecords > totalRecords ? totalRecords : totalShowRecords)}
        </span>
      )}
      {!showNotes && (
        <span>
          Total words
          {query ? (
            <>
              {" with"}
              <i>
                {" '"}
                {query} {"'"}
              </i>
            </>
          ) : null}
          {": " + totalRecords}
        </span>
      )}
      <Listwords
        listWords={listWords}
        showNotes={showNotes}
        setListWords={setListWords}
        ip={ip}
      />
      {listWords.length > 0 && (
        <>
          {!showNotes && (
            <>
              <br />
              <button
                disabled={listWords.length >= totalRecords || loading}
                type="button"
                onClick={() => {
                  const skip = nextResults + 1;
                  setNextResults(skip);
                }}
              >
                Load More
              </button>
              <br />
            </>
          )}
          <footer>
            <span className="ip">{ip || ":/ "} </span>
            {!ip && (
              <input
                name="ipBox"
                placeholder="Set Code"
                onChange={handlerInput}
              ></input>
            )}
          </footer>
        </>
      )} */}
    
    </Layout>
  );
};

export default Home;
