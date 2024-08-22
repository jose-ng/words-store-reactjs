"use client";
import { Search } from "@/components/Search/Search";
import { useAcademicInfo } from "@/hooks/useAcademcInfo";
import { AcademicInfo } from "@/models/academicInfo.model";
import { NoteService } from "@/services/note.service";
import { Layout } from "@components/Layout/Layout";
import { NextPage } from "next";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Dashbard: NextPage = () => {
  const pathname = usePathname();
  const [info, setInfo] = useState<AcademicInfo>();

  useEffect(() => {
    const serviceNotes = NoteService.create();
    const paths = pathname.split("/");
    const getData = async () => {
      try {
        const note: AcademicInfo = await serviceNotes.getNoteById(paths[paths.length - 1]);
        setInfo(note);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [pathname]);

  return (
    <Layout>
      <h1>{info?.title}</h1>
      {info?.text}
      <br />
      {info?.urlImg && (
        <div>
          <Image
            src={info.urlImg}
            alt={"alt"}
            width={0}
            height={0}
            layout="responsive"
          />
        </div>
      )}
    </Layout>
  );
};

export default Dashbard;
