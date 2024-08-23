"use client";
import { useEffect, useRef, useState } from "react";
import { NoteService } from "@services/note.service";
import { AcademicInfo, AcademicInfoObj } from "@models/academicInfo.model";

function useAcademicInfo() {
  const [academicObj, setAcademicObj] = useState<AcademicInfoObj>();
  const [nextResults, setNextResults] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalShowRecords, setTotalShowRecords] = useState(0);
  const [query, setQuery] = useState<string>("");
  const [limitResult, setLimitResult] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const notInitialRender = useRef(false); // Used for avoid the initial useEffect for 'query' search

  const performSearch = () => {
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

      const noteService = NoteService.create();
      res = await noteService.getAllNotes(q || "", nextResults, limitResult);

      const groupedItems = res.list.reduce(
        (acc: { [key: string]: AcademicInfo[] }, item: AcademicInfo) => {
          item.level = item.level || "Other";
          if (!acc[item.level]) {
            acc[item.level] = [];
          }
          acc[item.level].push(item);
          return acc;
        },
        {}
      );
      const noLevelObj = groupedItems["Other"];
      delete groupedItems["Other"];
      const sortedGroupedItems = { ...groupedItems, Other: noLevelObj };

      setAcademicObj(sortedGroupedItems);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    academicObj,
    setAcademicObj,
    nextResults,
    setNextResults,
    totalRecords,
    totalShowRecords,
    query,
    loading,
    handlerSearch,
  };
}
export { useAcademicInfo };
