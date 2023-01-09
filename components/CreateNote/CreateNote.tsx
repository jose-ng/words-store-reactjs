function CreateNote({ onSubmit, onChangeValue, form, sending }: any) {
  return (
    <form>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={onChangeValue}
      />
      <br />
      <textarea
        rows={4}
        name="text"
        placeholder="Text"
        value={form.text}
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

export default CreateNote;
