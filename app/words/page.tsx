"use client";
import type { NextPage } from "next";
import { Listwords } from "@components/Listwords/Listwords";
import { Search } from "@components/Search/Search";
import { Layout } from "@components/Layout/Layout";
import { useSearch } from "@hooks/useSearch";
import { WorkoutDialog } from "@/components/WorkoutDialog/WorkoutDialog";

const Words: NextPage = () => {
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

  return (
    <Layout onSearch={handlerSearch}>
      <section>
        <Search
          showNotes={showNotes}
          onSearch={handlerSearch}
          nextResults={nextResults}
        />
        <span>
          {"Total showed words: " + Math.min(totalShowRecords, totalRecords)}
        </span>
        <span>
          {", "}
          {query ? (
            <>
              {`${totalRecords} words with: `}
              <i>{`'${query}'`}</i>
            </>
          ) : (
            <>{`Total words ${totalRecords}`}</>
          )}
        </span>
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
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            disabled={listWords.length >= totalRecords || loading}
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
      <WorkoutDialog />
    </Layout>
  );
};

export default Words;
