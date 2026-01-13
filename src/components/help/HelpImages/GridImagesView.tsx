import React from "react";
import { Box, Typography } from "@mui/material";
import address from "../../../api/adress";
import { HelpImage } from "../../form/types";

interface GridImagesViewProps {
  images: HelpImage[];
  isMobile?: boolean;
}

const GridImagesView: React.FC<GridImagesViewProps> = ({ images, isMobile = false }) => {
  const minHeight = 120;
  const imagesCount = images.length;

  const getGridColumns = () => {
    if (isMobile) return "repeat(2, 2fr)";

    if (imagesCount <= 3) {
      return `repeat(${imagesCount}, 1fr)`;
    }

    if (imagesCount % 4 === 1) {
      return "repeat(3, 1fr)";
    }

    return "repeat(4, 1fr)";
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: getGridColumns(), 
        gap: 1.5,
        width: "100%",
        px: "24px",
        py: "24px",
        boxSizing: "border-box",

        ...(isMobile && {
      "@media (max-width: 400px)": {
        gridTemplateColumns: "1fr",
      },

      "@media (min-width: 401px) and (max-width: 900px)": {
        gridTemplateColumns: "repeat(2, 1fr)",
      },
    }),
      }}
    >
      {images.map((img) => (
        <Box
          key={img.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: `${minHeight}px`,
            maxHeight: "180px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
              backgroundColor: "#fafafa",
              borderRadius: "20px",
            }}
          >
            <img
              src={address + img.image_url}
              alt={img.caption || ""}
              style={{
                maxWidth: "100%",
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />

            {img.caption && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                  py: 1,
                  px: 2,
                }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#000",
                  }}
                >
                  {img.caption}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default GridImagesView;