function CreateWord({ onSubmit, onChangeValue, form, sending }: any) {
  return (
    <form>
      <input
        type="text"
        name="text_en"
        placeholder="Text en"
        value={form.text_en}
        onChange={onChangeValue}
      />
      <br />
      <input
        type="text"
        name="text_es"
        placeholder="Text es"
        value={form.text_es}
        onChange={onChangeValue}
      />
      <br />
      <input
        type="text"
        name="code"
        placeholder="code"
        value={form.code}
        onChange={onChangeValue}
      />
      <br />
      <button type="submit" disabled={sending} onClick={onSubmit}>
        Send
      </button>
    </form>
  );
}

export default CreateWord;
