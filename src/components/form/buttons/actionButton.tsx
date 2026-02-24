import React from "react";
import { Button } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

interface ActionButtonProps {
  onClick: () => void;
  isMobile?: boolean;
  variant?: "next" | "prev" | "send" | "nextStep" | "accept" | "uploadHouse";
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  variant = "next",
  disabled = false,
  isMobile = false,
}) => {
  const getButtonWidth = () => {
    if (isMobile) return "100%";
    if (variant === "nextStep") return "212px";
    if (variant === "uploadHouse") return "260px";
    return "100px";
  };

  const getStartIcon = () => {
    switch (variant) {
      case "prev":
        return <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 20 }} />;
      case "accept":
        return <CheckOutlinedIcon sx={{ fontSize: 20 }} />;
      default:
        return undefined;
    }
  };

  const getEndIcon = () => {
    switch (variant) {
      case "next":
      case "nextStep":
        return <ArrowCircleRightOutlinedIcon sx={{ fontSize: 20 }} />;
      case "uploadHouse":
        return <FileUploadOutlinedIcon sx={{ fontSize: 20 }} />;
      default:
        return undefined;
    }
  };

  const getLabel = () => {
    switch (variant) {
      case "prev":
        return "Prev";
      case "next":
        return "Next";
      case "send":
        return "Send";
      case "nextStep":
        return "Next step";
      case "accept":
        return "Accept";
      case "uploadHouse":
        return "Upload your house photo";
      default:
        return "";
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      startIcon={getStartIcon()}
      endIcon={getEndIcon()}
      sx={{
        backgroundColor: disabled ? "#BDBDBD" : "#48D858",
        width: getButtonWidth(),
        minWidth: isMobile ? "100%" : undefined,
        borderRadius: "999px",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 700,
        boxShadow: "none",
        color: "#fff",
        "&.Mui-disabled": {
          backgroundColor: "#BDBDBD",
          color: "#fff",
          opacity: 0.7,
        },
      }}
    >
      {getLabel()}
    </Button>
  );
};

export default ActionButton;
