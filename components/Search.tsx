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
      <div>
        <input
          name="search"
          placeholder="Search a word"
          value={searchForm.search}
          onChange={handlerSearch}
        ></input>
      </div>
    </section>
  );
}

export default Search;
