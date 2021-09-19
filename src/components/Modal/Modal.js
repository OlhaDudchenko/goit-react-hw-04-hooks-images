import React, { Component } from "react";
import { Overlay, ModalBlock } from "./Modal.styled";

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const image = this.props.image;
    return (
      //
      <Overlay onClick={this.handleBackdropClick}>
        <ModalBlock>
          <img src={image.largeImageURL} alt={image.tags} />
        </ModalBlock>
      </Overlay>
    );
  }
}
