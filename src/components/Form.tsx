import React from "react";
import { Box } from "@mui/material";
import HousePreview from "./HousePreview";
import ResultsTable from "./ResultsTable";
import ActionButton from "./form/buttons/actionButton";
import { FormStep, StepsData } from "../data/steps/types";
import Step from "./form/Step/Step";

interface FormProps {
  currentStep: number;
  totalSteps: number;
  parentStep: FormStep;
  skipStepIds: number[];
  onNext: (
    values?: Record<string, any>,
    triggerStepId?: number,
    selectedOptionId?: number
  ) => void;
  onPrev: () => void;
  onOptionChange: (option: any) => void;
  isMobile: boolean;
  values: Record<number, string | number>;
  setValues: React.Dispatch<React.SetStateAction<Record<number, string | number>>>;
  errors: Record<number, boolean>;
  setErrors: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  selectedOptions: number[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
  stepsData: StepsData;
}

const findStepByOptionId = (
  steps: StepsData["steps"],
  optionId: number
) => steps.find(step => step.options?.some(o => o.id === optionId));

const getSelectedColour = (
  selectedOptions: number[],
  steps: StepsData["steps"]
): string => {
  for (const optionId of selectedOptions) {
    const step = findStepByOptionId(steps, optionId);
    if (step?.input_type === "colour") {
      return step.options?.find(o => o.id === optionId)?.json_value ?? "white";
    }
  }
  return "white";
};

const renderPreview = (
  isLastStep: boolean,
  isMobile: boolean,
  selectedOptions: number[],
  stepsData: StepsData
) => (
  isLastStep
    ? <ResultsTable isMobile={isMobile} />
    : (
      <HousePreview
        selectedOptions={selectedOptions}
        colour={getSelectedColour(selectedOptions, stepsData.steps)}
        isMobile={isMobile}
      />
    )
);

const renderActions = (
  isFirstStep: boolean,
  isLastStep: boolean,
  isStepComplete: boolean,
  onNext: () => void,
  onPrev: () => void
) => {
  if (isFirstStep) {
    return (
      <ActionButton
        onClick={onNext}
        variant="nextStep"
        disabled={!isStepComplete}
      />
    );
  }

  if (isLastStep) {
    return (
      <>
        <ActionButton onClick={onPrev} variant="prev" />
        <ActionButton
          onClick={onNext}
          variant="send"
          disabled={!isStepComplete}
        />
      </>
    );
  }

  return (
    <>
      <ActionButton onClick={onPrev} variant="prev" />
      <ActionButton
        onClick={onNext}
        variant="next"
        disabled={!isStepComplete}
      />
    </>
  );
};

const Form = ({
  currentStep,
  totalSteps,
  parentStep,
  skipStepIds,
  onNext,
  onPrev,
  onOptionChange,
  isMobile,
  values,
  setValues,
  errors,
  setErrors,
  selectedOptions,
  setSelectedOptions,
  stepsData,
}: FormProps) => {

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const [isStepComplete, setIsStepComplete] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const handlers = (globalThis as any).__multiStepFormHandlers;
      if (handlers?.isStepComplete !== undefined) {
        setIsStepComplete(handlers.isStepComplete);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const callHandler = (name: "handleNextClick" | "handlePrevClick") => {
    const handlers = (globalThis as any).__multiStepFormHandlers;
    handlers?.[name]?.();
  };

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "930px",
        height: isMobile ? "auto" : "490px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        mt: isMobile ? 0 : "13px",
        mr: isMobile ? 0 : "24px",
      }}
    >
      {/* Preview */}
      <Box
        sx={{
          position: isMobile ? "relative" : "absolute",
          bottom: isMobile ? "auto" : "34px",
          right: isMobile ? "auto" : "38px",
          width: isMobile ? "100%" : "600px",
          height: isMobile ? "auto" : "450px",
          px: isMobile ? "24px" : 0,
          zIndex: isMobile ? 2 : "auto",
        }}
      >
        {renderPreview(isLastStep, isMobile, selectedOptions, stepsData)}
      </Box>

      <Box
        sx={{
          width: "calc(100% - 48px)",
          height: isMobile ? "auto" : "440px",
          mt: isMobile ? "-60px" : "40px",
          pt: isMobile ? "50px" : 0,
          borderRadius: "20px",
          backgroundColor: "#f4f4f4",
          mx: isMobile ? "24px" : 0,
        }}
      >
        <Step
          currentStep={currentStep}
          totalSteps={totalSteps}
          parentStep={parentStep}
          skipStepIds={skipStepIds}
          onNext={onNext}
          onPrev={onPrev}
          onOptionChange={(optionId, stepId) =>
            onOptionChange({ id: optionId, stepId })
          }
          isMobile={isMobile}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          stepsData={stepsData}
        />
      </Box>

      {!isMobile && (
        <Box
          sx={{
            position: "absolute",
            bottom: "-18px",
            left: "40px",
            display: "flex",
            gap: "12px",
          }}
        >
          {renderActions(
            isFirstStep,
            isLastStep,
            isStepComplete,
            () => callHandler("handleNextClick"),
            () => callHandler("handlePrevClick")
          )}
        </Box>
      )}
    </Box>
  );
};

export default Form;
