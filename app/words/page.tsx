"use client";
import type { NextPage } from "next";
import { Listwords } from "@components/Listwords/Listwords";
import { Search } from "@components/Search/Search";
import { Layout } from "@components/Layout/Layout";
import { WorkoutDialog } from "@/components/WorkoutDialog/WorkoutDialog";
import { FloatButtonContainer } from "@/components/FloatButtonContainer/FloatButtonContainer";
import { AddWordDialog } from "@/components/AddWordDialog/AddWordDialog";
import { useSearchWords } from "@/hooks/useSearchWords";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { Loading } from "@/components/Loading/Loading";
import { Card } from "@/components/Card/Card";
import { selectUserLoggedIn } from "@/utils/redux/slices/user.slice";
import { useSelector } from "react-redux";

const Words: NextPage = () => {
  const isLoggedIn = useSelector(selectUserLoggedIn);
  const {
    listWords,
    nextResults,
    handlerSetNextResult,
    totalRecords,
    totalShowRecords,
    query,
    loading,
    handlerSearch,
    inputRef,
    error,
  } = useSearchWords();

  return (
    <Layout onSearch={handlerSearch}>
      <section>
        <Search ref={inputRef} onSearch={handlerSearch} />
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
        error={error}
        loading={loading}
        onError={() => <ErrorMessage />}
        onLoading={() => <Loading />}
        onEmptySearch={() => (
          <p>
            There is no results for <i>{query}</i>
          </p>
        )}
        render={(item: any, index: any) => (
          <li className="list-none" key={item._id + "_" + index}>
            <Card item={item} isLoggedIn={isLoggedIn}></Card>
          </li>
        )}
      />
      {listWords.length > 0 && (
        <>
          <br />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            disabled={listWords.length >= totalRecords || loading}
            onClick={() => {
              const skip = nextResults + 1;
              handlerSetNextResult(skip);
            }}
          >
            Load More
          </button>
          <br />
        </>
      )}
      <FloatButtonContainer>
          <AddWordDialog />
          <WorkoutDialog />
      </FloatButtonContainer>
    </Layout>
  );
};

export default Words;
