import React from "react";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";

const ImageComponent = ({ imageUrls, isAvailable }) => {
  // Verificar si hay una o más URLs
  const urls = imageUrls.includes(",") ? imageUrls.split(",") : [imageUrls];

  // Selecciona la primera URL por ejemplo
  const selectedUrl = urls[0];

  return (
    <LazyLoadComponent>
      <LazyLoadImage
        className={`w-64 h-64 object-cover ${
          !isAvailable ? "grayscale opacity-50" : ""
        }`}
        src={`${selectedUrl}?f_auto,q_auto:eco`}
        alt="Imagen del producto"
      />
    </LazyLoadComponent>
  );
};

export default ImageComponent;
