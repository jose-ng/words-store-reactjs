import React, { useState } from "react";

function Search({ onSearch }: any) {
  const [searchForm, setSearchForm] = useState({ search: "" });

  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setSearchForm({
      ...searchForm,
      [name]: value,
    });

    onSearch(value);
  };

  return (
    <section>
      <input
        name="search"
        placeholder="Search a word"
        value={searchForm.search}
        onChange={handlerSearch}
      ></input>
    </section>
  );
}

export default Search;
