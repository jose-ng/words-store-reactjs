import React, { useState } from "react";
import URL_API from "../utils/env";

function CreateNote({ onCancel, onSearch }: any) {
  const [form, setForm] = useState({ title: "", text: "" });
  const [sending, setSending] = useState(false);

  const handlerSendWord = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSending(true);
    if (!form.title || !form.text) return;
    const res = await fetch(`${URL_API}/note/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    setSending(false);
    setForm({ title: "", text: "" });
    onCancel();
    onSearch();
  };

  const handlerSearch = (e: any) => {
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
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handlerSearch}
      />
      <br />
      <textarea
        rows={4}
        name="text"
        placeholder="Text"
        value={form.text}
        onChange={handlerSearch}
      />
      <br />
      <button type="submit" disabled={sending} onClick={handlerSendWord}>
        Send
      </button>
    </form>
  );
}

export default CreateNote;
