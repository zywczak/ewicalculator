import React from "react";
import { TextField } from "@mui/material";
import { StepInputProps } from "../StepInput";

const NumberStepInput: React.FC<StepInputProps> = ({
  step,
  value,
  onChange,
  isSubstep,
  isMobile = false,
}) => {
  const [localValue, setLocalValue] = React.useState(value || "");

  React.useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setLocalValue(val);
    }
  };

  const handleBlur = () => {
    if (localValue === "") {
      onChange("");
      return;
    }
    const numericValue = Number(localValue);
    onChange(numericValue < 0 ? 0 : numericValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <TextField
      type="text"
      value={localValue}
      variant="outlined"
      label={!isSubstep ? step.placeholder || "Enter m2" : undefined}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={isSubstep ? step.placeholder || "0" : undefined}

      InputLabelProps={{
        shrink: !!localValue,
        sx: {
          color: "#9E9E9E",
          position: "absolute",
          fontSize: "16px",
          left: localValue ? "14px" : "50%",
          top: localValue ? 0 : "50%",
          transform: localValue
            ? "translate(0, -50%) scale(0.75)"
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
      }}

      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      sx={{
        width: isSubstep ? (isMobile ? "150px" : "96px") : isMobile ? "calc(100% - 48px)" : "240px",
        mx: isSubstep ? 0 : "24px",
        mr: isSubstep ? "24px" : undefined,
        ml: isSubstep ? "8px" : undefined,
        "& .MuiOutlinedInput-root": {
          height: isSubstep ? "26px" : "44px",
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

export default NumberStepInput;
