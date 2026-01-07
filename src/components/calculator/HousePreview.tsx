import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import defaultImage from "../../assets/default.png";
import {
  buildOverlayImages,
  LayerType,
  LAYER_Z_INDEX
} from "../../data/images/imageMapping";

const adress = "http://0.0.0.0:80"

interface OverlayImages {
  main: string | null;
  second: string | null;
  third: string | null;
  fourth: string | null;
  fifth: string | null;
  sixth: string | null;
  seventh: string | null;
  eighth: string | null;
}

interface HousePreviewProps {
  selectedOptions: number[];
  colour: string;
  isMobile?: boolean;
}

const HousePreview: React.FC<HousePreviewProps> = ({
  selectedOptions,
  colour,
  isMobile = false
}) => {
  const [overlayImages, setOverlayImages] = useState<OverlayImages>({
    main: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null,
    sixth: null,
    seventh: null,
    eighth: null,
  });

  useEffect(() => {
    const newOverlays = buildOverlayImages(selectedOptions);
    console.log("Selected Options:", selectedOptions);
    console.log("Colour:", colour);
    setOverlayImages(newOverlays);
  }, [selectedOptions, colour]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        width: isMobile ? "100%" : "600px",
        height: isMobile ? "auto" : "450px",
        aspectRatio: isMobile ? "4/3" : undefined,
      }}
    >
      <Box
        component="img"
        src={defaultImage}
        alt="default"
        sx={{
          width: "100%",
          height: "100%",
          margin: 0,
          borderRadius: isMobile ? 2 : 3,
          objectFit: "contain",
          zIndex: 0,
        }}
      />

      {(Object.keys(overlayImages) as LayerType[])
        .filter((layer) => overlayImages[layer] !== null)
        .map((layer) => (
          <Box
            key={layer}
            component="img"
            src={adress + overlayImages[layer]!}
            alt={layer}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "opacity 0.4s ease-in-out",
              opacity: 1,
              zIndex: LAYER_Z_INDEX[layer],
            }}
          />
        ))}

      {overlayImages.fifth && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: LAYER_Z_INDEX.fifth,
            backgroundColor: colour,
            WebkitMaskImage: `url(${adress + overlayImages.fifth})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center",
            maskImage: `url(${adress + overlayImages.fifth})`,
            maskRepeat: "no-repeat",
            maskSize: "contain",
            maskPosition: "center",
            transition: "opacity 0.4s ease-in-out",
          }}
        />
      )}
    </Box>
  );
};

export default HousePreview;