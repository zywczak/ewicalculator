import React from "react";
import { Box, Typography } from "@mui/material";
import { StepInputProps } from "../StepInput";

const RadioStepInput: React.FC<StepInputProps> = ({ step, value, onChange, isSubstep, isMobile = false }) => {
  const handleChange = (val: string) => {
    const selectedOpt = step.options.find((o) => o.option_value === val);
    onChange(val, selectedOpt?.id);
  };

  return (
    <Box
      sx={{
        width: isSubstep ? isMobile ? "170px" : "130px" : "100%",
      }}
    >
      {step.options.map((opt, index) => {
        const isSelected = value === opt.option_value;
        const isLast = index === step.options.length - 1;

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