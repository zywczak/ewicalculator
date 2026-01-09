import React from "react";
import { Box } from "@mui/material";
import HousePreview from "../HousePreview";
import ResultsTable from "../ResultsTable";
import ActionButton from "./buttons/actionButton";
import MultiStepForm from "./MultiStepForm";

import { FormStep, StepsData } from "../../../data/steps/stepsData";

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
      const handlers = (window as any).__multiStepFormHandlers;
      if (handlers?.isStepComplete !== undefined) {
        setIsStepComplete(handlers.isStepComplete);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleNextClick = () => {
    const handlers = (window as any).__multiStepFormHandlers;
    if (handlers?.handleNextClick) {
      handlers.handleNextClick();
    }
  };

  const handlePrevClick = () => {
    const handlers = (window as any).__multiStepFormHandlers;
    if (handlers?.handlePrevClick) {
      handlers.handlePrevClick();
    }
  };

  return (
    <Box
      sx={{
        width: isMobile ? '100%' : '930px',
        height: isMobile ? 'auto' : '490px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        mt: isMobile ? "0" : "13px",
        mr: isMobile ? "0" : "24px",
      }}
    >
      {isMobile ? (
        <Box sx={{ mb: 0, width: '100%', maxWidth: '100%', boxSizing: "border-box", px: '24px', position: 'relative', zIndex: 2 }}>
          {isLastStep ? (
            <ResultsTable isMobile={isMobile} />
          ) : (
            <HousePreview
              selectedOptions={selectedOptions}
              colour={
                (() => {
                  const colourOptionId = selectedOptions.find(optId => {
                    const step = stepsData?.steps.find(s => s.options?.some(o => o.id === optId));
                    return step?.options?.some(o => o.id === optId && step.input_type === "colour");
                  });
                  const colourOption = stepsData?.steps
                    .flatMap(s => s.options || [])
                    .find(o => o.id === colourOptionId);
                  return colourOption?.json_value || "white";
                })()
              }
              isMobile={isMobile}
            />
          )}
        </Box>
      ) : (
        <Box
          sx={{
            position: 'absolute',
            bottom: '34px',
            right: '38px',
            width: '600px',
            height: '450px',
          }}
        >
          {isLastStep ? (
            <ResultsTable isMobile={isMobile} />
          ) : (
            <HousePreview
              selectedOptions={selectedOptions}
              colour={
                (() => {
                  const colourOptionId = selectedOptions.find(optId => {
                    const step = stepsData?.steps.find(s => s.options?.some(o => o.id === optId));
                    return step?.options?.some(o => o.id === optId && step.input_type === "colour");
                  });
                  const colourOption = stepsData?.steps
                    .flatMap(s => s.options || [])
                    .find(o => o.id === colourOptionId);
                  return colourOption?.json_value || "white";
                })()
              }
              isMobile={isMobile}
            />
          )}
        </Box>
      )}

      <Box sx={{
        width: 'calc(100% - 48px)',
        height: isMobile ? "auto" : "440px",
        mt: isMobile ? "-60px" : "40px",
        pt: isMobile ? "50px" : "0px",
        borderRadius: '20px',
        backgroundColor: '#f4f4f4',
        mx: isMobile ? '24px' : '0px',
      }} >
        <MultiStepForm
          currentStep={currentStep}
          totalSteps={totalSteps}
          parentStep={parentStep}
          skipStepIds={skipStepIds}
          onNext={onNext}
          onPrev={onPrev}
          onOptionChange={(optionId, stepId) => onOptionChange({ id: optionId, stepId })}
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
      {isMobile ? null :
        <Box
          sx={{
            position: "absolute",
            bottom: "-18px",
            left: "28px",
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            py: 1,
          }}
        >
          {isFirstStep && (
            <ActionButton onClick={handleNextClick} variant="nextStep" disabled={!isStepComplete} />
          )}

          {!isFirstStep && !isLastStep && (
            <><ActionButton onClick={handlePrevClick} variant="prev" /><ActionButton onClick={handleNextClick} variant="next" disabled={!isStepComplete} /></>
          )}

          {isLastStep && (
            <><ActionButton onClick={handlePrevClick} variant="prev" /><ActionButton variant="send" onClick={handleNextClick} disabled={!isStepComplete} />
            </>
          )}
        </Box>
      }
      <Box
        sx={{
          position: "absolute",
          bottom: "-32px",
          right: "200px",
          display: "flex",
          gap: 2,
          overflowX: "auto",
          py: 1,
        }}
      >
      </Box>
    </Box>
  );
};

export default Form;
