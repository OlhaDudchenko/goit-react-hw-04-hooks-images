import React, { useState, useEffect } from "react";
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

export function App() {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFormSubmit = (searchValue) => {
    setSearchValue(searchValue);
    setPage(1);
    setImages([]);
  };

  const incrementPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleSelectImage = (data) => {
    setSelectedImage(data);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    const fetchImages = () => {
      setStatus(Status.PENDING);
      api
        .fetchImages(searchValue, page)
        .then((data) => {
          setImages((prevImages) => [...prevImages, ...data.hits]);
          setStatus(Status.RESOLVED);
        })
        .catch((error) => setError(error));
    };
    fetchImages();
  }, [page, searchValue]);

  return (
    <>
      {error && <h1>An error has occurred!</h1>}
      {status === Status.IDLE && <Searchbar onSubmit={handleFormSubmit} />}
      {status === Status.PENDING && (
        <div>
          <Searchbar onSubmit={handleFormSubmit} />
          <Loader
            type="Grid"
            color="Grey"
            height={100}
            width={100}
            timeout={3000}
            style={{ textAlign: "center", marginTop: "30vw" }}
          />
        </div>
      )}
      {status === Status.RESOLVED && (
        <>
          <Searchbar onSubmit={handleFormSubmit} />
          <ImageGallery images={images} onSelectImage={handleSelectImage} />
          {images.length > 0 && <Button page={page} onClick={incrementPage} />}
          {selectedImage && (
            <Modal image={selectedImage} onCloseModal={handleCloseModal} />
          )}
          {images.length === 0 && (
            <ErrorMessage text={`Sorry!We don't have images with this name`} />
          )}
        </>
      )}
    </>
  );
}
