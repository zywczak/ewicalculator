import React, { useState } from "react";
import { TextField } from "@mui/material";
import { StepInputProps } from "../Step/StepInput";

const TextStepInput: React.FC<StepInputProps> = ({
  step,
  value,
  onChange,
  onErrorChange,
  label,
  isMobile = false,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);

    if (step.validation_regex) {
      const regex = new RegExp(step.validation_regex);
      const valid = regex.test(val);
      setError(valid ? null : "Incorrect format");
      onErrorChange?.(!valid);
    } else {
      setError(null);
      onErrorChange?.(false);
    }
  };

  const localValue = Boolean(value);

  return (
    <TextField
      value={value}
      variant="outlined"
      label={label || step.step_name}
      onChange={handleChange}
      error={!!error}
      helperText={error}
      slotProps={{
        inputLabel: {
          shrink: localValue,
          sx: {
            color: "#9E9E9E",
            position: "absolute",
            fontSize: "16px",
            left: localValue ? "14px" : "50%",
            top: localValue ? 0 : "22px",
            transform: localValue
              ? "translate(-5%, -40%) scale(0.85)"
              : "translate(-50%, -50%)",
            transformOrigin: "top left",
            transition: "all 0.2s ease",
            pointerEvents: "none",
            backgroundColor: "transparent",
            px: 0,

            "&.Mui-focused": {
              color: "#9E9E9E",
              backgroundColor: "transparent",
            },
            "&.MuiInputLabel-shrink": {
              backgroundColor: "transparent",
            },
          },
        },
      }}

      sx={{
        mt: "8px",
        width: isMobile ? "calc(100% - 48px)" : "244px",
        mx: "24px",
        mb: "16px",
        "& .MuiOutlinedInput-root": {
          height: "44px",
          borderRadius: "44px",
          backgroundColor: "#fff",
          fontSize: "16px",
          "& fieldset": {
            borderColor: "#E0E0E0",
          },
          "&:hover fieldset": {
            borderColor: "#D0D0D0",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#B0B0B0",
          },
        },
        "& input": {
          textAlign: "center",
          color: "#333",
          padding: "10px 14px",
        },
      }}
    />
  );
};

export default TextStepInput;