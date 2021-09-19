import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { ErrorMessage } from "./components/Error/ErrorMessage";
import "react-toastify/dist/ReactToastify.css";
import { Searchbar } from "./components/Searchbar";
import { ImageGallery } from "./components/ImageGallery";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal/Modal";
import { api } from "./services/images-api";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export class App extends Component {
  state = {
    searchValue: "",
    page: 1,
    images: [],
    error: null,
    status: Status.IDLE,
    selectedImage: null,
  };
  handleFormSubmit = (searchValue) => {
    this.setState({ searchValue, page: 1, images: [] });
  };
  incrementPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };
  handleSelectImage = (data) => {
    this.setState({ selectedImage: data });
  };
  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  componentDidUpdate(prevProps, prevState) {
    const nextValue = this.state.searchValue;
    const prevValue = prevState.searchValue;

    if (prevValue !== nextValue || prevState.page !== this.state.page) {
      this.setState({ status: Status.PENDING });

      api
        .fetchImages(nextValue, this.state.page)
        .then((data) => {
          this.setState((prevState) => ({
            images: [...prevState.images, ...data.hits],
            status: Status.RESOLVED,
          }));
        })
        .catch((error) => console.log(error));
    }
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  render() {
    const { images, status, selectedImage } = this.state;

    if (status === "idle") {
      return <Searchbar onSubmit={this.handleFormSubmit} />;
    }
    if (status === "pending") {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <Loader
            type="Grid"
            color="Grey"
            height={100}
            width={100}
            timeout={3000}
            style={{ textAlign: "center", marginTop: "30vw" }}
          />
        </div>
      );
    }

    if (status === "resolved") {
      return (
        <>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery
            images={images}
            onSelectImage={this.handleSelectImage}
          />
          {images.length > 0 && <Button onClick={this.incrementPage} />}
          {this.state.selectedImage && (
            <Modal image={selectedImage} onCloseModal={this.handleCloseModal} />
          )}
          {images.length === 0 && (
            <ErrorMessage text={`Sorry!We don't have images with this name`} />
          )}
        </>
      );
    }
  }
}
