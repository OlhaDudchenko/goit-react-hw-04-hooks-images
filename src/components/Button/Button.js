import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ButtonLoadMore } from "./Button.styled";

export function Button({ onClick, page }) {
  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [page]);

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
