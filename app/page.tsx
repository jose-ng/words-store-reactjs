
"use client"
import type { NextPage } from "next";
import { Listwords } from "@components/Listwords/Listwords";
import { Search } from "@components/Search/Search";
import { Layout } from "@components/Layout/Layout";
import { useSearch } from "@hooks/useSearch";

const Home: NextPage = () => {
  const {
    listWords,
    setListWords,
    showNotes,
    setShowNotes,
    nextResults,
    setNextResults,
    totalRecords,
    totalShowRecords,
    query,
    loading,
    handlerSearch,
  } = useSearch();

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;

    setShowNotes(value);
  };

  return (
    <Layout onSearch={handlerSearch}>
      <section>
        <div>
          Show notes{" "}
          <input
            type="checkbox"
            checked={!!showNotes}
            onChange={handlerInput}
          />
        </div>
        <Search
          showNotes={showNotes}
          onSearch={handlerSearch}
          nextResults={nextResults}
        />
        {!showNotes && (
          <span>
            {" Total show words: " +
              (totalShowRecords > totalRecords
                ? totalRecords
                : totalShowRecords)}
          </span>
        )}
        {!showNotes && (
          <span>
            {", Total words"}
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
      </section>
      <Listwords
        listWords={listWords}
        showNotes={showNotes}
        setListWords={setListWords}
      />
      {listWords.length > 0 && !showNotes && (
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
    </Layout >
  );
};

export default Home;
