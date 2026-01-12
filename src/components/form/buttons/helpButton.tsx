import React from "react";
import { Button } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface HelpButtonProps {
  helpAvailable: boolean;
  isMobile?: boolean;
  onHelpClick: () => void;
}

const HelpButton: React.FC<HelpButtonProps> = ({ helpAvailable, onHelpClick, isMobile = false }) => {
  if (!helpAvailable) return null;

  return (
    <Button
      onClick={onHelpClick}
      sx={{
        backgroundColor: "#437A8E",
        width: isMobile ? "100%" : "212px",
        borderRadius: "999px",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 700,
        boxShadow: "none",
        color: "#fff",
      }}
      endIcon={
          <HelpOutlineIcon sx={{ fontSize: 20 }} />
      }
    >
      Open help
    </Button>
  );
};

export default HelpButton;
