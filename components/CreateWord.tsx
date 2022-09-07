import React, { useState } from "react";
import URL_API from "../utils/env";

function CreateWord({ setShowCreate, onSearch }: any) {
  const [form, setForm] = useState({ text_es: "", text_en: "" });
  const [sending, setSending] = useState(false);

  const handlerSendWord = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSending(true);
    if (!form.text_en || !form.text_es) return;
    const res = await fetch(`${URL_API}/word/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    setSending(false);
    setForm({ text_es: "", text_en: "" });
    setShowCreate(false);
    onSearch();
  };

  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value.trim(),
    });
  };

  return (
    <form>
      <input
        type="text"
        name="text_en"
        placeholder="Text en"
        value={form.text_en}
        onChange={handlerSearch}
      />
      <br />
      <input
        type="text"
        name="text_es"
        placeholder="Text es"
        value={form.text_es}
        onChange={handlerSearch}
      />
      <br />
      <button type="submit" disabled={sending} onClick={handlerSendWord}>
        Send
      </button>
    </form>
  );
}

export default CreateWord;
