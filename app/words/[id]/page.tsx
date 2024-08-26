"use client";
import { Card } from "@/components/Card/Card";
import { WordInfo } from "@/models/wordInfo.model";
import { WordService } from "@/services/word.service";
import { selectUserLoggedIn } from "@/utils/redux/slices/user.slice";
import { Layout } from "@components/Layout/Layout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// TODO: Implement detail component
function Dashbard() {
  const pathname = usePathname();
  const [info, setInfo] = useState<WordInfo>();
  const isLoggedIn = useSelector(selectUserLoggedIn);

  useEffect(() => {
    const wordService = WordService.create();
    const paths = pathname.split("/");
    const getData = async () => {
      try {
        const word: WordInfo = await wordService.getWordById(
          paths[paths.length - 1]
        );
        setInfo(word);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [pathname]);

  useEffect(() => {
    const paths = pathname.split("/");
  }, [pathname]);

  return (
    <Layout>{info && <Card isLoggedIn={isLoggedIn} item={info} />}</Layout>
  );
}

export default Dashbard;
