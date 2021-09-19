import React from "react";
import PropTypes from "prop-types";
import { ButtonLoadMore } from "./Button.styled";

export function Button({ onClick }) {
  return (
    <div style={{ textAlign: "center" }}>
      <ButtonLoadMore type="button" onClick={onClick}>
        Load more
      </ButtonLoadMore>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
