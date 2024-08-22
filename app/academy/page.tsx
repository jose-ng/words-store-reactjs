"use client";
import { Search } from "@/components/Search/Search";
import { useAcademicInfo } from "@/hooks/useAcademcInfo";
import { Layout } from "@components/Layout/Layout";
import { NextPage } from "next";
import Link from "next/link";

const Dashbard: NextPage = () => {
  const {
    list,
    setList,
    nextResults,
    setNextResults,
    totalRecords,
    totalShowRecords,
    query,
    loading,
    handlerSearch,
  } = useAcademicInfo();
  // const notInitialRender = useRef(false); // Used for avoid the initial useEffect for 'query' search
  // const listReordered = { "Sin nivel": [] }; 

  return (
    <Layout onSearch={handlerSearch}>
      <Search
        showNotes={true}
        onSearch={handlerSearch}
        nextResults={nextResults}
      />
      <section>
        <div>
          {Object.keys(list).map((level) => (
            <div key={level}>
              <h3>Level: {level}</h3>
              <ul className="pl-2">
                {list[level].map((item: any, index: any) => (
                  <li key={index}>
                    <Link
                      href={`/academy/${item.id}`}
                      scroll={true}
                      className="pl-2 flex flex-wrap flex-col flex-1"
                    >
                      {" "}
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Dashbard;
