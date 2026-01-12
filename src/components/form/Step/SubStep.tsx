import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import StepInput from "./StepInput";
import { FormStep, StepsData } from "../../../data/steps/types";

interface SubStepProps {
  step: FormStep;
  value: string | number;
  onChange: (stepId: number, value: string | number, optionId?: number) => void;
  valuesMap?: Record<number, string | number>;
  isMobile?: boolean;
  selectedParentOptionIds?: number[];
  stepsData?: StepsData;
}

const SubStep: React.FC<SubStepProps> = ({
  step,
  value,
  onChange,
  valuesMap = {},
  isMobile = false,
  selectedParentOptionIds = [],
  stepsData,
}) => {
  const theme = useTheme();
  const isInlineInput = step.input_type === "text" || step.input_type === "number" || step.input_type === "radio";

  const isSubstepSkipped = React.useCallback((substepId: number): boolean => {
    if (!stepsData) return false;
    
    return stepsData.steps.some(s => 
      s.conditions?.some(cond => 
        cond.skip_steps.includes(substepId) && 
        selectedParentOptionIds.includes(cond.trigger_option)
      )
    );
  }, [stepsData, selectedParentOptionIds]);

  const visibleNestedSubsteps = React.useMemo(() => {
    if (!step.substeps || step.substeps.length === 0) return [];
    
    return step.substeps.filter(sub => !isSubstepSkipped(sub.id));
  }, [step.substeps, isSubstepSkipped]);

  const hasSubsteps = visibleNestedSubsteps.length > 0;
  const isDeepest = !hasSubsteps;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isInlineInput ? "row" : "column",
        alignItems: isInlineInput ? "center" : "stretch",
        justifyContent: "space-between",
        position: "relative",
        py: isDeepest ? "8px" : 0,
        "&::after": isDeepest
          ? {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 24,
            right: 24,
            height: "1px",
            backgroundColor: theme.palette.divider,
          }
          : undefined,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: "#444",
          fontSize: "12px",
          fontWeight: 400,
          flex: 1,
          pl: isDeepest ? "33px" : 0,
        }}
      >
        {step.step_name || ""}
      </Typography>

      <Box sx={{ flexShrink: 0 }}>
        <StepInput
          step={step}
          value={value}
          onChange={(val, optionId) => onChange(step.id, val, optionId)}
          isSubstep
          label={isInlineInput ? undefined : (step.step_name || undefined)}
          isMobile={isMobile}
          selectedParentOptionIds={selectedParentOptionIds}
        />
      </Box>

      {visibleNestedSubsteps.map((sub) => (
        <Box key={sub.id} sx={{ width: "100%", mt: 1 }}>
          <SubStep
            step={sub}
            value={valuesMap[sub.id] || ""}
            onChange={onChange}
            valuesMap={valuesMap}
            isMobile={isMobile}
            selectedParentOptionIds={selectedParentOptionIds}
            stepsData={stepsData}
          />
        </Box>
      ))}
    </Box>
  );
};

export default SubStep;