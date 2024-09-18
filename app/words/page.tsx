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
        nextResults={nextResults}
        handlerSetNextResult={handlerSetNextResult}
        totalRecords={totalRecords}
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
      <FloatButtonContainer>
          <AddWordDialog />
          <WorkoutDialog />
      </FloatButtonContainer>
    </Layout>
  );
};

export default Words;
