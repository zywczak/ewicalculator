import React from "react";
import { Box, Typography } from "@mui/material";
import { HelpImage } from "../../form/types";
import address from "../../../api/adress";

interface SingleImageViewProps {
  image: HelpImage;
  isMobile?: boolean;
}

const SingleImageView: React.FC<SingleImageViewProps> = ({ image, isMobile = false }) => {
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
          src={address + image.image_url}
          alt={image.caption || ""}
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

        {image.caption && (
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
              {image.caption}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SingleImageView;