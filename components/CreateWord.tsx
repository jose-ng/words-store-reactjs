import React, { useState } from "react";
import URL_API from "../utils/env";

function CreateWord() {
  const [form, setForm] = useState({ text_es: "", text_en: "" });
  const handlerSendWord = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!form.text_en || !form.text_es) return;
    fetch(`${URL_API}/word/add`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };
  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
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
      <button type="submit" onClick={handlerSendWord}>
        Send
      </button>
    </form>
  );
}

export default CreateWord;
