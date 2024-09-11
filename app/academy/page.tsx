"use client";
import { AddNoteDialog } from "@/components/AddNoteDialog/AddNoteDialog";
import { FloatButtonContainer } from "@/components/FloatButtonContainer/FloatButtonContainer";
import { Search } from "@/components/Search/Search";
import { useAcademicInfo } from "@/hooks/useAcademcInfo";
import { Layout } from "@components/Layout/Layout";
import { NextPage } from "next";
import Link from "next/link";

const Dashbard: NextPage = () => {
  const {
    academicObj,
    nextResults,
    handlerSearch,
  } = useAcademicInfo();
  
  return (
    <Layout onSearch={handlerSearch}>
      <Search
        showNotes={true}
        onSearch={handlerSearch}
        nextResults={nextResults}
      />
      <section>
        <div>
          {academicObj && Object.keys(academicObj).map((level) => (
            <div key={level}>
              <h3>Level: {level}</h3>
              <ul className="pl-2">
                {academicObj[level].map((item: any, index: any) => (
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
        <FloatButtonContainer>
          <AddNoteDialog onSearch={handlerSearch} />
        </FloatButtonContainer>
      </section>
    </Layout>
  );
};

export default Dashbard;
