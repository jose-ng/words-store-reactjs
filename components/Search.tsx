import React, { useState } from "react";

function Search() {
  const [searchForm, setSearchForm] = useState({ search: "" });
  const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setSearchForm({
      ...searchForm,
      [name]: value,
    });
  };
  const handlerSearchBtnEnter = () =>{

  }
  return (
    <section>
      <div>
        <input
          name="search"
          placeholder="Search a word"
          value={searchForm.search}
          onChange={handlerSearch}
        ></input>
        <button type="button" onClick={handlerSearchBtnEnter}>Search</button>
      </div>
    </section>
  );
}

export default Search;
