import { useEffect, useRef, useState } from "react";
import URL_API from "../utils/env";

function useSearch() {
  const [listWords, setListWords] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const [nextResults, setNextResults] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalShowRecords, setTotalShowRecords] = useState(0);
  const [query, setQuery] = useState<string>("");
  const [limitResult, setLimitResult] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const notInitialRender = useRef(false); // Used for avoid the initial useEffect for 'query' search

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
    console.log("1");
    performSearch();
  }, [showNotes]);

  useEffect(() => {
    if (notInitialRender.current) {
      console.log("2");
      getInfo();
    }
  }, [nextResults]);

  useEffect(() => {
    if (notInitialRender.current) {
      const delayDebounceFn = setTimeout(() => {
        console.log("3");
        performSearch();
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    } else {
      notInitialRender.current = true;
    }
  }, [query]);

  const getInfo = async (q?: string) => {
    try {
      setLoading(true);
      let res: any = {};
      q = q || query;
      if (showNotes) {
        res = await fetch(`${URL_API}/note/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(q),
        });
        res = await res.json();

        res = res.map((item: any) => {
          return {
            ...item,
            hideAllText: true,
          };
        });
      } else {
        const data = { q: q || query, skip: nextResults, limit: limitResult };
        if (data.q && listWords.length == 0) {
          data.skip = 0;
        }

        res = await fetch(`${URL_API}/word/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        res = await res.json();
        const tWords = res.totalWords;
        setTotalRecords(tWords);
        const words = res.words.map((item: any) => {
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
      }

      setListWords(res);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  return {
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
  };
}
export default useSearch;
