import React from "react";
import { Box, Typography } from "@mui/material";
import address from "../../../api/adress";
import { HelpImage } from "../../form/types";

interface ImagesWithDescriptionViewProps {
  images: HelpImage[];
  isMobile?: boolean;
}

const ImagesWithDescriptionView: React.FC<ImagesWithDescriptionViewProps> = ({ images, isMobile = false }) => {
  const minHeight = 120;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "1fr"
          : {
            xs: "1fr",
            md: "repeat(2, 1fr)",
          },
        gap: 2,
        px: isMobile ? "12px" : "0px",
      }}
    >
      {images.map((img) => (
        <Box
          key={img.id}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 2,
            width: "100%",
            minHeight: `${minHeight}px`,
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
              width: "150px",
              minHeight: `${minHeight}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
              borderRadius: "20px",
            }}
          >
            <img
              src={address + img.image_url}
              alt={img.caption || ""}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "40vh",
                objectFit: "contain",
              }}
            />

            {img.caption && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                  py: 1,
                  px: 2,
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "#000",
                  }}
                >
                  {img.caption}
                </Typography>
              </Box>
            )}
          </Box>

          {img.description && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "flex-start",
                maxHeight: `calc(${minHeight}px + 40px)`,
                overflow: "auto",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#000000",
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              >
                {img.description}
              </Typography>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ImagesWithDescriptionView;