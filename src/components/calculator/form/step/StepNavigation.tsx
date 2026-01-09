import React from "react";
import { Box, Button, useTheme } from "@mui/material";

interface StepNavigationProps {
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  isStepComplete: boolean;
  isMobile?: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  isFirst,
  isLast,
  onPrev,
  onNext,
  isStepComplete,
  isMobile = false,
}) => {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="space-between" sx={{ mt: isMobile ? 1 : 2 }}>
      {!isFirst ? (
        <Button
          variant="contained"
          onClick={onPrev}
          sx={{
            bgcolor: "#eeeeee",
            border: `2px solid ${"#bdbdbd"}`,
            color: "#757575",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: isMobile ? 1 : 2,
            px: isMobile ? 2 : 3,
            py: isMobile ? 0.5 : 1,
            fontSize: isMobile ? "12px" : "14px",
            minWidth: isMobile ? "80px" : "auto",
          }}
        >
          Previous
        </Button>
      ) : (
        <Box />
      )}

      <Button
        variant="contained"
        onClick={onNext}
        disabled={!isStepComplete}
        sx={{
          bgcolor: "#c8e6c9",
          border: isStepComplete ? `2px solid ${"#54A852"}` : 'none',
          color: "#54A852",
          "&:disabled": {
            bgcolor: "#e0e0e0",
            color: "#9e9e9e",
          },
          textTransform: "none",
          fontWeight: 600,
          borderRadius: isMobile ? 1 : 2,
          px: isMobile ? 2 : 3,
          py: isMobile ? 0.5 : 1,
          fontSize: isMobile ? "12px" : "14px",
          minWidth: isMobile ? "80px" : "auto",
        }}
      >
        {isLast ? "Send" : "Next"}
      </Button>
    </Box>
  );
};

export default StepNavigation;
