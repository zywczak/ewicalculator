import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";

type StepStatus = "disabled" | "enabled" | "current" | "clickable";

interface ProcessStepProps {
  order: number;
  status: StepStatus;
  stepName?: string;
  onClick: () => void;
}

const STATUS_STYLES: Record<
  StepStatus,
  { bg: string; text: string; border: string }
> = {
  enabled: {
    bg: "#8B959A",
    text: "#ffffff",
    border: "none",
  },
  current: {
    bg: "#438E44",
    text: "#ffffff",
    border: "none",
  },
  clickable: {
    bg: "#e2e2e2ff",
    text: "#666666",
    border: "none",
  },
  disabled: {
    bg: "#EEEEEE",
    text: "#c4c4c4",
    border: "2px solid #ffffff",
  },
};

const stripHtml = (html: string) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const ProcessStep: React.FC<ProcessStepProps> = ({
  order,
  status,
  stepName,
  onClick,
}) => {
  const colors = STATUS_STYLES[status];
  const isInteractive = status === "enabled" || status === "clickable";

  return (
    <Tooltip title={stepName ? stripHtml(stepName) : ""} arrow>
      <Box
        onClick={isInteractive ? onClick : undefined}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: "50%",
          bgcolor: colors.bg,
          color: colors.text,
          border: "2px solid #ffffff",
          boxSizing: "border-box",
          flexShrink: 0,
          cursor: isInteractive ? "pointer" : "default",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: 700, fontSize: 16, lineHeight: 1 }}
        >
          {order}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default ProcessStep;
