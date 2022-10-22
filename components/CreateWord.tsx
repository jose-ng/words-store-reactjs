import React, { CSSProperties, useState } from "react";
import URL_API from "../utils/env";
import styles from "./Create.module.scss";

function CreateWord({ onCancel, onSearch, ip }: any) {
  const [form, setForm] = useState({ text_es: "", text_en: "", ip: ip });
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlerSendWord = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSending(true);
    setErrorMsg("");
    try {
      if (!form.text_en || !form.text_es) return;
      const res = await fetch(`${URL_API}/word/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        setSending(false);
        setForm({ text_es: "", text_en: "", ip: ip });
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
  }

  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      {errorMsg && (
        <>
          <br />
          <div className={styles['Error']}>{errorMsg}</div>
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

export default CreateWord;
