import React, { useEffect } from "react";
import { Overlay, ModalBlock } from "./Modal.styled";

export function Modal({ image, onCloseModal }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      onCloseModal();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalBlock>
        <img src={image.largeImageURL} alt={image.tags} />
      </ModalBlock>
    </Overlay>
  );
}
