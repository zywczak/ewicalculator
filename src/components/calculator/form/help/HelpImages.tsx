import React from "react";
import { Box, Typography } from "@mui/material";
import { HelpImage } from "../types";
import address from "../../../../api/adress";

const adress = "https://precious-choux-6bd82f.netlify.app"

interface HelpImagesProps {
  images: HelpImage[];
  isMobile?: boolean;
}

const HelpImages: React.FC<HelpImagesProps> = ({ images, isMobile = false }) => {
  const count = images.length;
  const minHeight = 120;

  const imagesCount = images.length;

  const getGridColumns = () => {
    if (isMobile) return "repeat(2, 1fr)";

    if (imagesCount <= 3) {
      return `repeat(${imagesCount}, 1fr)`;
    }

    if (imagesCount % 4 === 1) {
      return "repeat(3, 1fr)";
    }

    return "repeat(4, 1fr)";
  };


  if (count === 1) {
    const img = images[0];
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          px: isMobile ? "0px" : "24px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={adress + img.image_url}
            alt={img.caption || ""}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              height: "auto",
              width: "auto",
              display: "block",
              objectFit: "scale-down",
              borderRadius: "20px",
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
    );
  }

  const hasAnyDescription = images.some((img) => img.description);

  if (!hasAnyDescription) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: isMobile ? "repeat(2, 1fr)" : getGridColumns(),
          },
          gap: 1.5,
          width: "100%",
          px: "24px",
          py: "24px",
          boxSizing: "border-box",
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
                src={adress + img.image_url}
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
  }

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
              src={adress + img.image_url}
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

export default HelpImages;