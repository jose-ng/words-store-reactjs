import React, { CSSProperties, useState } from "react";
import URL_API from "../utils/env";
import styles from "./Create.module.scss";

function CreateNote({ onCancel, onSearch, ip }: any) {
  const [form, setForm] = useState({ title: "", text: "", ip: ip });
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlerSendWord = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg("");
    try {
      if (!form.title || !form.text) return;
      const res = await fetch(`${URL_API}/note/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.status === 200) {
        setSending(false);
        setForm({ title: "", text: "", ip: ip });
        onCancel();
        onSearch();
      } else {
        setSending(false);
        if (res.status === 403) setErrorMsg("Action not allowed");
      }
    } catch (err) {
      setSending(false);
      setErrorMsg("Server error");
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
    <form className={styles.Container}>
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
      {errorMsg && (
        <>
          <br />
          <div className={styles["Error"]}>{errorMsg}</div>
        </>
      )}
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
