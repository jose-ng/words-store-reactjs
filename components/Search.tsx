import React, { useState } from "react";

import styles from "./Search.module.scss";

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
    <section className={styles.SearchContainer}>
      <div>
        <input
          name="search"
          placeholder="Search a word"
          value={searchForm.search}
          onChange={handlerSearch}
        ></input>
        {searchForm.search && (
          <button
            type="button"
            onClick={() => {
              setSearchForm({
                ...searchForm,
                search: "",
              });
            }}
          >
            x
          </button>
        )}
      </div>
    </section>
  );
}

export default Search;
