import { useState, useRef } from "react";
import { StepsData } from "../data/steps/types";
import { STEPS_DATA } from "../data/steps/stepsData";
import { CalculatedMaterials } from "./materialCalculator";

export function useCalculatorState() {
  // Auth
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [sessionNumber, setSessionNumber] = useState(0);

  // Form
  const [stepsData] = useState<StepsData>(STEPS_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [values, setValues] = useState<Record<number, string | number>>({});
  const [errors, setErrors] = useState<Record<number, boolean>>({});
  const [accumulatedJsonData, setAccumulatedJsonData] = useState<Record<string, any>>({});
  const [calculatedMaterials, setCalculatedMaterials] = useState<CalculatedMaterials | null>(null);
  const [targetStepToReach, setTargetStepToReach] = useState<number | null>(null);
  const [logID, setLogID] = useState(0);

  const [isMobileView, setIsMobileView] = useState(globalThis.innerWidth <= 705);
  const [isSmallerTitle, setIsSmallerTitle] = useState(globalThis.innerWidth <= 900);
  const [openHelp, setOpenHelp] = useState(false);
  const [isStepComplete, setIsStepComplete] = useState(false);
  const [focusedSubstepImage, setFocusedSubstepImage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const cardRef = useRef<HTMLDivElement>(null);

  // Image / drawing
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [outlinePoints, setOutlinePoints] = useState<any[]>([]);
  const [canCompleteOutline, setCanCompleteOutline] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedImageBase64, setGeneratedImageBase64] = useState<string | null>(null);
  const [compositeImage, setCompositeImage] = useState<string | null>(null);

  return {
    isAuthorizing, setIsAuthorizing,
    isAuthorized, setIsAuthorized,
    authError, setAuthError,
    sessionNumber, setSessionNumber,
    stepsData,
    currentStep, setCurrentStep,
    completedSteps, setCompletedSteps,
    selectedOptions, setSelectedOptions,
    values, setValues,
    errors, setErrors,
    accumulatedJsonData, setAccumulatedJsonData,
    calculatedMaterials, setCalculatedMaterials,
    targetStepToReach, setTargetStepToReach,
    logID, setLogID,
    isMobileView, setIsMobileView,
    isSmallerTitle, setIsSmallerTitle,
    openHelp, setOpenHelp,
    isStepComplete, setIsStepComplete,
    focusedSubstepImage, setFocusedSubstepImage,
    snackbarOpen, setSnackbarOpen,
    snackbarMessage, setSnackbarMessage,
    snackbarSeverity, setSnackbarSeverity,
    cardRef,
    customImage, setCustomImage,
    isDrawingMode, setIsDrawingMode,
    outlinePoints, setOutlinePoints,
    canCompleteOutline, setCanCompleteOutline,
    isGeneratingImage, setIsGeneratingImage,
    generatedImage, setGeneratedImage,
    generatedImageBase64, setGeneratedImageBase64,
    compositeImage, setCompositeImage,
  };
}