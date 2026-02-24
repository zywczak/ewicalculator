import React from "react";
import { Box } from "@mui/material";
import HousePreview from "./HousePreview";
import ResultsTable from "./ResultsTable";
import ActionButton from "./form/buttons/actionButton";
import { FormStep, StepsData } from "../data/steps/types";
import Step from "./form/Step/Step";
import { CalculatedMaterials } from "../services/materialCalculator";

interface FormProps {
  currentStep: number;
  totalSteps: number;
  parentStep: FormStep;
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
  customImage?: string | null;
  isDrawingMode?: boolean;
  onOutlineChange?: (points: any[], canComplete: boolean) => void;
  canCompleteOutline?: boolean;
  onCustomImageUpload?: (file: File) => void;
  onAcceptOutline?: (customImage?: string | null) => void;
  onRemoveCustomImage?: () => void;
  onColourSelection?: (colourValue: string, optionId: number) => void;
  isGeneratingImage?: boolean;
  generatedImage?: string | null;
  calculatedMaterials?: CalculatedMaterials | null;
}

const renderPreview = ({
  isLastStep,
  isMobile,
  selectedOptions,
  customImage,
  isDrawingMode,
  onOutlineChange,
  generatedImage,
  isGeneratingImage,
  currentStep,
  onRemoveCustomImage,
  onCustomImageUpload,
    onAcceptOutline,
  canCompleteOutline,
  calculatedMaterials,
  stepsData
}: {
  isLastStep: boolean;
  isMobile: boolean;
  selectedOptions: number[];
  customImage?: string | null;
  isDrawingMode?: boolean;
  onOutlineChange?: (points: any[], canComplete: boolean) => void;
  generatedImage?: string | null;
  isGeneratingImage?: boolean;
  currentStep?: number;
  onRemoveCustomImage?: () => void;
  onCustomImageUpload?: (file: File) => void;
  onAcceptOutline?: () => void;
  canCompleteOutline?: boolean;
  calculatedMaterials?: CalculatedMaterials | null;
  stepsData: StepsData;
}) => (
  isLastStep
    ? <ResultsTable 
        isMobile={isMobile} 
        calculatedMaterials={calculatedMaterials ?? null}
        stepsData={stepsData}
      />
    : <HousePreview 
        selectedOptions={selectedOptions} 
        isMobile={isMobile}
        customImage={customImage}
        isDrawingMode={isDrawingMode}
        onOutlineChange={onOutlineChange}
        generatedImage={generatedImage}
        isGeneratingImage={isGeneratingImage}
        currentStep={currentStep}
        onResetToDefault={onRemoveCustomImage}
        onCustomImageUpload={onCustomImageUpload}
        onAcceptOutline={onAcceptOutline}
        canCompleteOutline={canCompleteOutline}
      />
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
  customImage,
  isDrawingMode,
  onOutlineChange,
  canCompleteOutline,
  onCustomImageUpload,
  onAcceptOutline,
  onRemoveCustomImage,
  onColourSelection,
  isGeneratingImage,
  generatedImage,
  calculatedMaterials,
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

  const prevStepRef = React.useRef(currentStep);

  React.useEffect(() => {
    if (!stepsData?.steps) {
      prevStepRef.current = currentStep;
      return;
    }

    if (currentStep < prevStepRef.current) {
      const stepsToClear = stepsData.steps.slice(currentStep + 1);
      const optionIdsToRemove = new Set<number>();
      stepsToClear.forEach((s) => s.options.forEach((o) => optionIdsToRemove.add(o.id)));

      setSelectedOptions((prev) => prev.filter((id) => !optionIdsToRemove.has(id)));
    }

    if (currentStep > prevStepRef.current) {
      const newStep = stepsData.steps[currentStep];
      if (newStep) {
        const val = (values as Record<number, any>)[newStep.id];
        if (val !== undefined && val !== "") {
          const found = newStep.options?.find(o => o.option_value === val || o.json_value === val);
          if (found) {
            setSelectedOptions(prev => (prev.includes(found.id) ? prev : [...prev, found.id]));
            onOptionChange?.({ id: found.id, stepId: newStep.id });
          }
        }
      }
    }

    prevStepRef.current = currentStep;
  }, [currentStep, stepsData, setSelectedOptions]);

  const callHandler = (name: "handleNextClick" | "handlePrevClick") => {
    const handlers = (globalThis as any).__multiStepFormHandlers;
    handlers?.[name]?.();
  };

  const isColourStep = currentStep === 10;
  

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
          boxSizing: "border-box",
          zIndex: isMobile ? 2 : "auto",
          mb: (isMobile  && isColourStep) ? "24px" : 0,
        }}
      >
        {renderPreview({
          isLastStep,
          isMobile,
          selectedOptions,
          customImage,
          isDrawingMode,
          onOutlineChange,
          generatedImage,
          isGeneratingImage,
          currentStep,
          onRemoveCustomImage,
          onCustomImageUpload,
          onAcceptOutline,
          canCompleteOutline,
          calculatedMaterials,
          stepsData
        })}
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
          isDrawingMode={isDrawingMode}
          onColourSelection={onColourSelection}
        />
      </Box>

      {!isMobile && (
        <Box
          sx={{
            position: "absolute",
            bottom: "-10px",
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
