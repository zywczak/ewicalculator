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
  onAcceptOutline?: () => void;
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
  calculatedMaterials?: CalculatedMaterials | null;
  stepsData: StepsData;
}) => (
  isLastStep
    ? <ResultsTable 
        isMobile={isMobile} 
        calculatedMaterials={calculatedMaterials ?? null}
        selectedOptions={selectedOptions}
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

  const callHandler = (name: "handleNextClick" | "handlePrevClick") => {
    const handlers = (globalThis as any).__multiStepFormHandlers;
    handlers?.[name]?.();
  };

  const isColourStep = currentStep === 10; // Step 11 has index 10
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onCustomImageUpload) {
      onCustomImageUpload(file);
    }
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
          boxSizing: "border-box",
          zIndex: isMobile ? 2 : "auto",
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

      {!isMobile && isColourStep && !customImage && (
        <Box
          sx={{
            position: "absolute",
            bottom: "-10px",
            right: "288px",
            zIndex: 10,
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <ActionButton
            variant="uploadHouse"
            onClick={handleUploadClick}
          />
        </Box>
      )}

       {/* Drawing instruction text - positioned above preview */}
      {!isMobile && isColourStep && isDrawingMode && isDrawingMode && customImage && (
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

      {/* Accept outline button - pokazuje się od razu po wstawieniu zdjęcia, disabled póki nie narysowano */}
{!isMobile && isColourStep && customImage && isDrawingMode && (
  <Box
    sx={{
      position: "absolute",
      bottom: "-10px",
      right: "288px",
      zIndex: 10,
    }}
  >
    <ActionButton
      variant="accept"
      onClick={onAcceptOutline ?? (() => {})}
      disabled={!canCompleteOutline}
      isMobile={false}
    />
  </Box>
)}
    </Box>
  );
};

export default Form;
