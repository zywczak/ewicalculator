import React from "react";
import { Box, Typography } from "@mui/material";
import { StepInputProps } from "../StepInput";

const RadioStepInput: React.FC<StepInputProps> = ({ step, value, onChange, isSubstep, isMobile = false, selectedParentOptionIds = [] }) => {
  const handleChange = (val: string) => {
    const selectedOpt = step.options.find((o) => o.option_value === val);
    onChange(val, selectedOpt?.id);
  };

  // Filter options based on parent_option_id
  const filteredOptions = React.useMemo(() => {
    return step.options.filter(opt => {
      // If option has no parent_option_id, it's always visible
      if (!opt.parent_option_id || opt.parent_option_id.length === 0) {
        return true;
      }
      
      // If option has parent_option_id, check if any selected parent option ID is in the list
      return opt.parent_option_id.some(parentId => selectedParentOptionIds.includes(parentId));
    });
  }, [step.options, selectedParentOptionIds]);

  return (
    <Box
      sx={{
        width: isSubstep ? isMobile ? "170px" : "130px" : "100%",
      }}
    >
      {filteredOptions.map((opt, index) => {
        const isSelected = value === opt.option_value;
        const isLast = index === filteredOptions.length - 1;

        return (
          <Box
            key={opt.id}
            onClick={() => handleChange(opt.option_value)}
            sx={{
              cursor: "pointer",
              display: "flex",
              height: isSubstep ? "30px" : "45px",
              alignItems: "center",
              pl: "30px",
              position: "relative",
              transition: "background-color 0.2s ease",
              backgroundColor: isSelected ? "#438E44" : "transparent",
              fontWeight: isSelected ? "700" : "400",
              color: isSelected ? "#fff" : "#000",
              "&::before": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "20px",
                right: isSubstep ? "24px" : "20px",
                height: "1px",
                backgroundColor: isLast ? "transparent" : isSelected ? "transparent" : "#E0E0E0",
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