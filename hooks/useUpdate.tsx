"use client"
import { useState } from "react";
import { WordService } from "@services/word.service";
import { NoteService } from "@services/note.service";

function useUpdate() {
  const [form, setForm] = useState<any>({});
  const [sending, setSending] = useState(false);
  const [errorCreate, setErrorCreate] = useState<string>();

  const handlerSubmit = async (id: string, data: { rating: string }, path: string) => {
    setSending(true);
    setErrorCreate("");
    try {
      // const isEmpty =
      //   Object.keys(form).length !== 2 ||
      //   !Object.values(form).some((x) => x !== null && x !== "");

      // if (isEmpty) {
      //   setSending(false);
      //   setErrorCreate("Invalid data");
      //   return;
      // }
      let res;
      if (path === "word") {
        
        const wordService = WordService.create();
        res = await wordService.updateWord(id, data as any);
      } else {
        const noteService = NoteService.create();
      }

      setSending(false);
      setForm({});


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
    resetValues,
  };
}

export { useUpdate };
