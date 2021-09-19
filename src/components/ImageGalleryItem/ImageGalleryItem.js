import React from "react";
import PropTypes from "prop-types";
import { GalleryItem, ItemImage } from "./ImageGalleryItem.styled";

export function ImageGalleryItem({ images, onSelectImage }) {
  return (
    <GalleryItem key={images.id}>
      <ItemImage
        src={images.webformatURL}
        alt={images.tags}
        onClick={() => onSelectImage(images)}
      />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.object.isRequired,
  onSelectImage: PropTypes.func.isRequired,
};
