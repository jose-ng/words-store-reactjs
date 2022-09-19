import React, { CSSProperties, useState } from "react";
import URL_API from "../utils/env";

function CreateWord({ onCancel, onSearch, ip }: any) {
  const [form, setForm] = useState({ text_es: "", text_en: "", ip: ip });
  const [sending, setSending] = useState(false);

  const handlerSendWord = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSending(true);
    try {
      if (!form.text_en || !form.text_es) return;
      const res = await fetch(`${URL_API}/word/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      setSending(false);
      setForm({ text_es: "", text_en: "", ip: ip });
      onCancel();
      onSearch();
    } catch (err) {
      setSending(false);
    }
  };

  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value.trim(),
    });
  };

  const buttonStyle: CSSProperties = {
    margin: "10px 0",
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
      <button
        type="submit"
        disabled={sending}
        onClick={handlerSendWord}
        style={buttonStyle}
      >
        Send
      </button>
    </form>
  );
}

export default CreateWord;
