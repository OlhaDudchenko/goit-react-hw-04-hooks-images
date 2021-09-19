import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  SearchbarBlock,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from "./Searchbar.styled";

export function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputValue = (event) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleOnSubmitform = (event) => {
    event.preventDefault();
    if (searchValue.trim() === "") {
      toast.warn("Enter the search request !");
      return;
    }
    onSubmit(searchValue);
    setSearchValue("");
  };
  return (
    <div>
      <SearchbarBlock>
        <SearchForm onSubmit={handleOnSubmitform}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={handleInputValue}
          />
        </SearchForm>
      </SearchbarBlock>
      <ToastContainer position="top-right" autoClose={3000} />

      <ToastContainer />
    </div>
  );
}
