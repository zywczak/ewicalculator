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
  onCustomImageSelected?: () => void;
  customHouseImage?: any;
  onHouseImageChange?: (imageData: any) => void;
}

const renderPreview = (
  isLastStep: boolean,
  isMobile: boolean,
  selectedOptions: number[],
  onCustomImageSelected?: () => void,
  currentStep?: number,
  stepsData?: StepsData,
  onHouseImageChange?: (imageData: any) => void,
  onGeneratingChange?: (isGenerating: boolean) => void
) => (
  isLastStep
    ? <ResultsTable isMobile={isMobile} />
    : (
      <HousePreview
        selectedOptions={selectedOptions}
        isMobile={isMobile}
        onCustomImageSelected={onCustomImageSelected}
        currentStep={currentStep}
        stepsData={stepsData}
        onHouseImageChange={onHouseImageChange}
        onGeneratingChange={onGeneratingChange}
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
  onCustomImageSelected,
  customHouseImage,
  onHouseImageChange,
}: FormProps) => {

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const [isStepComplete, setIsStepComplete] = React.useState(false);
  const [canCompleteOutline, setCanCompleteOutline] = React.useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = React.useState(false);
  const [isDrawingMode, setIsDrawingMode] = React.useState(false);
  const [outlineCompleted, setOutlineCompleted] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const handlers = (globalThis as any).__multiStepFormHandlers;
      if (handlers?.isStepComplete !== undefined) {
        setIsStepComplete(handlers.isStepComplete);
      }
      
      // Check if outline can be completed and drawing mode status
      const housePreviewHandlers = (window as any).__housePreviewHandlers;
      if (housePreviewHandlers?.canComplete !== undefined) {
        setCanCompleteOutline(housePreviewHandlers.canComplete);
      }
      if (housePreviewHandlers?.isDrawingMode !== undefined) {
        setIsDrawingMode(housePreviewHandlers.isDrawingMode);
      }
      if (housePreviewHandlers?.outlineCompleted !== undefined) {
        setOutlineCompleted(housePreviewHandlers.outlineCompleted);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const callHandler = (name: "handleNextClick" | "handlePrevClick") => {
    const handlers = (globalThis as any).__multiStepFormHandlers;
    handlers?.[name]?.();
  };

  const handleCompleteOutline = () => {
    const housePreviewHandlers = (window as any).__housePreviewHandlers;
    housePreviewHandlers?.completeOutline?.();
  };

  // Determine if Next Step should be enabled
  const canProceedToNextStep = () => {
    if (!isStepComplete) return false;
    if (isGeneratingImage) return false;
    
    // For first step with custom image, check if it's DETACHED or outline is completed
    if (isFirstStep && customHouseImage) {
      // If there was drawing mode initially and outline is not completed, block
      const housePreviewHandlers = (window as any).__housePreviewHandlers;
      const needsOutline = housePreviewHandlers?.needsOutline;
      
      if (needsOutline && !outlineCompleted) {
        return false;
      }
    }
    
    return true;
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
      {/* Drawing instruction text - positioned above preview */}
      {!isMobile && isFirstStep && isDrawingMode && !outlineCompleted && customHouseImage && (
        <Box
          sx={{
            position: "absolute",
            top: "-24px",
            right: "38px",
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            textAlign: 'center',
            width: '600px',
            padding: '2px 24px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 500,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          Mark your house
        </Box>
       )}

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
        }}
      >
        {renderPreview(
          isLastStep, 
          isMobile, 
          selectedOptions, 
          onCustomImageSelected, 
          currentStep, 
          stepsData, 
          onHouseImageChange,
          setIsGeneratingImage
        )}
      </Box>

      {/* Accept button for outline - positioned over preview */}
      {!isMobile && isFirstStep && canCompleteOutline && !outlineCompleted && (
        <Box
          sx={{
            position: "absolute",
            bottom: "-10px",
            right: "250px",
            zIndex: 100,
          }}
        >
          <ActionButton
            onClick={handleCompleteOutline}
            variant="accept"
            isMobile={false}
          />
        </Box>
      )}

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
          customHouseImage={customHouseImage}
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
            canProceedToNextStep(),
            () => callHandler("handleNextClick"),
            () => callHandler("handlePrevClick")
          )}
        </Box>
      )}
    </Box>
  );
};

export default Form;
