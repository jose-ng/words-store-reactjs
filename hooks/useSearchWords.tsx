"use client";
import { useEffect, useRef, useState } from "react";
import { WordService } from "@services/word.service";

function useSearchWords() {
  const [listWords, setListWords] = useState([]);
  const [nextResults, setNextResults] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalShowRecords, setTotalShowRecords] = useState(0);
  const [query, setQuery] = useState<string>("");
  const [limitResult, setLimitResult] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const notInitialRender = useRef(false);
  const performSearch = () => {
    setListWords([]);
    setTotalRecords(0);
    setNextResults(0);
    getInfo();
  };

  const handlerSearch = (q: string) => {
    setQuery(q);
  };

  useEffect(() => {
    performSearch();
  }, []);

  useEffect(() => {
    if (notInitialRender.current) {
      getInfo();
    }
  }, [nextResults]);

  useEffect(() => {
    if (notInitialRender.current) {
      const delayDebounceFn = setTimeout(() => {
        performSearch();
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } else {
      notInitialRender.current = true;
    }
  }, [query]);

  const getInfo = async (q?: string) => {
    try {
      setLoading(true);
      q = q || query;

      const data = { q: q || query, skip: nextResults, limit: limitResult };
      if (data.q && listWords.length == 0) {
        data.skip = 0;
      }

      const wordService = WordService.create();
      let res = await wordService.getAllWords(
        q || "",
        nextResults,
        limitResult
      );

      const tWords = res.total;
      setTotalRecords(tWords);
      const words = res.list.map((item: any) => {
        return {
          ...item,
          hideAllText: true,
        };
      });

      if (listWords.length > 0 && data.skip > 0) {
        res = [...listWords, ...words];
        setTotalShowRecords(limitResult * (data.skip + 1));
      } else {
        res = words;
        setTotalShowRecords(words.length);
      }

      setListWords(res);
    } catch (err: any) {
      // TO DO: handle error
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    listWords,
    nextResults,
    handlerSetNextResult: (value: number) => setNextResults(value),
    totalRecords,
    totalShowRecords,
    query,
    loading,
    handlerSearch,
    inputRef,
    error
  };
}
export { useSearchWords };
