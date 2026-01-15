import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface HelpHeaderProps {
  isMobile: boolean;
  onClose: () => void;
}

export const HelpHeader: React.FC<HelpHeaderProps> = ({ isMobile, onClose}) => {
  return isMobile ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pl: "16px",
        pr: "10px",
        py: "10px",
      }}
    >
      <Typography sx={{ fontWeight: 700, color: "#333333", fontSize: "16px" }}>
        Help
      </Typography>
      <IconButton
        onClick={onClose}
        sx={{
          backgroundColor: "#000",
          borderRadius: "50%",
          height: "24px",
          width: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 0,
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
      >
        <CloseIcon sx={{ color: "#fff", fontSize: "16px" }} />
      </IconButton>
    </Box>
  ) : (
    <IconButton
      onClick={onClose}
      sx={{
        alignSelf: "flex-end",
        mr: "10px",
        my: "6px",
        backgroundColor: "#000",
        borderRadius: "50%",
        height: "24px",
        width: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 0,
        "&:hover": {
          backgroundColor: "#333",
        },
      }}
    >
      <CloseIcon sx={{ color: "#fff", fontSize: "16px" }} />
    </IconButton>
  );
};
