import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  SearchbarBlock,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from "./Searchbar.styled";

export class Searchbar extends Component {
  state = {
    searchValue: "",
  };
  handleInputValue = (event) => {
    this.setState({ searchValue: event.currentTarget.value });
  };

  handleOnSubmitform = (event) => {
    event.preventDefault();
    if (this.state.searchValue.trim() === "") {
      toast.warn("Enter the search request !");
      return;
    }
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: "" });
  };
  render() {
    return (
      <div>
        <SearchbarBlock>
          <SearchForm onSubmit={this.handleOnSubmitform}>
            <SearchFormButton type="submit">
              <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            </SearchFormButton>

            <SearchFormInput
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.searchValue}
              onChange={this.handleInputValue}
            />
          </SearchForm>
        </SearchbarBlock>
        <ToastContainer position="top-right" autoClose={3000} />

        <ToastContainer />
      </div>
    );
  }
}
