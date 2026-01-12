import React from "react";
import SingleImageView from "./SingleImageView";
import GridImagesView from "./GridImagesView";
import ImagesWithDescriptionView from "./ImagesWithDescriptionView";
import { HelpImage } from "../../form/types";

interface HelpImagesProps {
  images: HelpImage[];
  isMobile?: boolean;
}

const HelpImages: React.FC<HelpImagesProps> = ({ images, isMobile = false }) => {
  const count = images.length;

  if (count === 1) {
    return <SingleImageView image={images[0]} isMobile={isMobile} />;
  }

  const hasAnyDescription = images.some((img) => img.description);

  if (hasAnyDescription) {
    return <ImagesWithDescriptionView images={images} isMobile={isMobile} />;
  }

  return <GridImagesView images={images} isMobile={isMobile} />;
};

export default HelpImages;