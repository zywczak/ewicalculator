import React from "react";
import { Box, Typography } from "@mui/material";
import { StepInputProps } from "../Step/StepInput";

const RadioStepInput: React.FC<StepInputProps> = ({ step, value, onChange, isSubstep, isMobile = false, selectedParentOptionIds = [] }) => {
  const handleChange = (optionId: number, jsonValue: string | number) => {
    // Always use json_value for data storage
    onChange(jsonValue, optionId);
  };

  const filteredOptions = React.useMemo(() => {
    return step.options.filter(opt => {
      if (!opt.parent_option_id || opt.parent_option_id.length === 0) {
        return true;
      }

      return opt.parent_option_id.some(parentId => selectedParentOptionIds.includes(parentId));
    });
  }, [step.options, selectedParentOptionIds]);

  const width = React.useMemo(() => {
    if (!isSubstep) return "100%";
    return isMobile ? "170px" : "130px";
  }, [isSubstep, isMobile]);

  return (
    <Box
      sx={{
        width: width,
      }}
    >
      {filteredOptions.map((opt, index) => {
        // Compare with both json_value and option_value for backward compatibility
        const isSelected = value === opt.json_value || value === opt.option_value;
        const isLast = index === filteredOptions.length - 1;

        const backgroundColor = (isLast || isSelected) ? "transparent" : "#E0E0E0";

        return (
          <Box
            key={opt.id}
            onClick={() => {
              handleChange(opt.id, opt.json_value ?? opt.option_value);
              if ((globalThis as any).__setFocusedSubstepImage) {
                (globalThis as any).__setFocusedSubstepImage(opt.image ?? null);
              }
            }}
            sx={{
              cursor: "pointer",
              display: "flex",
              height: isSubstep ? "30px" : "45px",
              alignItems: "center",
              pl: "30px",
              position: "relative",

              backgroundColor: isSelected ? "#48D858" : "transparent",
              color: isSelected ? "#fff" : "#000",
              fontWeight: isSelected ? 700 : 400,

              transition: `
                background-color 0.4s ease,
                color 0.4s ease,
                font-weight 0.4s ease
              `,

              "&:hover": {
                backgroundColor: isSelected ? "#48D858" : "#8B959A",
                color: "#fff",
              },

              "&::before": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "20px",
                right: isSubstep ? "24px" : "20px",
                height: "1px",
                backgroundColor: isSelected ? "#48D858" : backgroundColor,
                transition: "background-color 0.4s ease",
              },

              "&:hover::before": {
                backgroundColor: "#ffffff00",
              },
            }}
          >

            <Typography
              sx={{
                fontWeight: isSelected ? 700 : 400,
                fontSize: isSubstep ? "14px" : "16px",
                pl: 1,
              }}
            >
              {opt.option_value}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default RadioStepInput;