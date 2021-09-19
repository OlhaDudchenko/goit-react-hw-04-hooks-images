import React from "react";
import PropTypes from "prop-types";
import { ImageGalleryItem } from "../ImageGalleryItem";
import { ImageGalleryList } from "./ImageGallery.styled";

export function ImageGallery({ images, onSelectImage }) {
  return (
    <ImageGalleryList>
      {images.map((image) => {
        return (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            images={image}
            onSelectImage={onSelectImage}
          />
        );
      })}
    </ImageGalleryList>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onSelectImage: PropTypes.func.isRequired,
};
