import React from "react";
import { Button } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

interface ActionButtonProps {
  onClick: () => void;
  isMobile?: boolean;
  variant?: "next" | "prev" | "send" | "nextStep" | "accept";
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  variant = "next",
  disabled = false,
  isMobile = false,
}) => {
  const isNext = variant === "next";
  const isPrev = variant === "prev";
  const isSend = variant === "send";
  const isNextStep = variant === "nextStep";
  const isAccept = variant === "accept";

  const getButtonWidth = () => {
    if (isMobile) return "100%";
    if (isNextStep) return "212px";
    return "100px";
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
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
      startIcon={
        isPrev ? <ArrowCircleLeftOutlinedIcon sx={{ fontSize: 20 }} /> : undefined
      }
      endIcon={
        isNext || isNextStep
          ? <ArrowCircleRightOutlinedIcon sx={{ fontSize: 20 }} />
          : undefined
      }
    >
      {isPrev && "Prev"}
      {isNext && "Next"}
      {isSend && "Send"}
      {isNextStep && "Next step"}
      {isAccept && "Accept"}
    </Button>
  );
};

export default ActionButton;
