"use client"
import { useState } from "react";
import URL_API from "../utils/env";
import WordService from "@/services/word.service";
import NoteService from "@/services/note.service";

function useCreate() {
  const [createOption, setCreateOption] = useState<"word" | "note" | "">();
  const [form, setForm] = useState<any>({});
  const [sending, setSending] = useState(false);
  const [errorCreate, setErrorCreate] = useState<string>();

  const handlerSubmit = async (path: string) => {
    setSending(true);
    setErrorCreate("");
    try {
      const isEmpty =
        Object.keys(form).length !== 2 ||
        !Object.values(form).some((x) => x !== null && x !== "");

      if (isEmpty) {
        setSending(false);
        setErrorCreate("Invalid data");
        return;
      }
      let res;
      if (path === "word") {        
        const wordService = WordService.create();
        res = await wordService.addWord(form.text_en, form.text_es);
      } else {
        const noteService = NoteService.create();
        res = await noteService.addNote(form.title, form.text);
      }

      setSending(false);
      setForm({});

      // const res = await fetch(`${URL_API}/${path}`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(form),
      // });

      // if (res.ok) {
      //   setSending(false);
      //   setForm({});
      //   //onSearch(null, true);
      // } else {
      //   setSending(false);
      //   if (res.status === 403) setErrorCreate("Action not allowed");
      //   else setErrorCreate("Server error");
      // }
    } catch (err) {
      setSending(false);
      setErrorCreate("Server error");
    }
  };

  const handlerChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const resetValues = () => {
    setForm({});
    setCreateOption("");
    setSending(false);
    setErrorCreate("");
  };

  return {
    handlerSubmit,
    handlerChangeValue,
    form,
    setForm,
    sending,
    errorCreate,
    createOption,
    setCreateOption,
    resetValues,
  };
}

export { useCreate };
