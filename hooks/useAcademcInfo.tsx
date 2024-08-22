"use client";
import { useEffect, useRef, useState } from "react";
import { NoteService } from "@services/note.service";
import { AcademicInfo, AcademicInfoDto } from "@/models/AcademicInfo.model";

function useAcademicInfo() {
  const [list, setList] = useState([]);
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
      res.list = res.list.reduce((acc: any, obj: { level: string; }) => {
        // Si el nivel no existe en el acumulador, inicialízalo como un array vacío
        obj.level = obj.level || "Sin nivel";
        if (!acc[obj.level]) {
          acc[obj.level] = [];
        }
        // Añadir el objeto actual al array correspondiente al nivel
        acc[obj.level].push(obj);
        return acc;
      }, {});
    
      setList(res.list);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    list,
    setList,
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
