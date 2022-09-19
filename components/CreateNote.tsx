import React, { CSSProperties, useState } from "react";
import URL_API from "../utils/env";

function CreateNote({ onCancel, onSearch, ip }: any) {
  const [form, setForm] = useState({ title: "", text: "", ip: ip });
  const [sending, setSending] = useState(false);

  const handlerSendWord = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSending(true);
    try {
      if (!form.title || !form.text) return;
      const res = await fetch(`${URL_API}/note/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      setSending(false);
      setForm({ title: "", text: "", ip: ip });
      onCancel();
      onSearch();
    } catch (err) {
      setSending(false);
    }
  };

  const handlerSearch = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const buttonStyle: CSSProperties = {
    margin: "10px 0",
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

export default CreateNote;
