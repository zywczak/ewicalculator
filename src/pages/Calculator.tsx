import React, { useEffect } from "react";
import { Box, Card, Typography, Snackbar, Alert } from "@mui/material";
import ProcessFlow from "../components/flow/ProcessFlow";
import StepHeader from "../components/form/Step/StepHeader";
import EwiproLogo from "../assets/EWI-Pro-Render-Systems.png";
import FormBoard from "../components/Form";
import ActionButton from "../components/form/buttons/actionButton";
import HelpButton from "../components/form/buttons/helpButton";
import ResponsiveCalculatorWrapper from "../components/FormWrapper";
import Help from "../components/help/Help";
import OPTION_IDS from "../data/constants/optionIds";
import { calculateMaterials } from "../services/materialCalculator";
import { useCalculatorState } from "../services/Usecalculatorstate";
import { useCalculatorLogic } from "../services/Usecalculatorlogic";


const RENDER_TYPE_IDS = new Set<number>([
  OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.RENDER_TYPE.PREMIUM_BIO,
  OPTION_IDS.RENDER_TYPE.SILICONE, OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE,
]);

const getApiKey = () => {
  const urlParams = new URLSearchParams(globalThis.location.search);
  return urlParams.get("apiKEY") || import.meta.env.VITE_API_KEY;
};

const Calculator: React.FC = () => {
  const s = useCalculatorState();

  const logic = useCalculatorLogic({
    stepsData: s.stepsData,
    currentStep: s.currentStep, setCurrentStep: s.setCurrentStep,
    selectedOptions: s.selectedOptions, setSelectedOptions: s.setSelectedOptions,
    completedSteps: s.completedSteps, setCompletedSteps: s.setCompletedSteps,
    values: s.values, setValues: s.setValues,
    accumulatedJsonData: s.accumulatedJsonData, setAccumulatedJsonData: s.setAccumulatedJsonData,
    calculatedMaterials: s.calculatedMaterials,
    generatedImageBase64: s.generatedImageBase64, setGeneratedImageBase64: s.setGeneratedImageBase64,
    sessionNumber: s.sessionNumber, logID: s.logID, setLogID: s.setLogID,
    outlinePoints: s.outlinePoints, setOutlinePoints: s.setOutlinePoints,
    setCanCompleteOutline: s.setCanCompleteOutline,
    setCustomImage: s.setCustomImage, setIsDrawingMode: s.setIsDrawingMode,
    setGeneratedImage: s.setGeneratedImage, setCompositeImage: s.setCompositeImage,
    setIsGeneratingImage: s.setIsGeneratingImage,
    setTargetStepToReach: s.setTargetStepToReach,
    setSnackbarMessage: s.setSnackbarMessage, setSnackbarSeverity: s.setSnackbarSeverity,
    setSnackbarOpen: s.setSnackbarOpen,
  });

  const {
    parentSteps, clearColourSelection, clearStepSelection, clearGeneratedImages,
    handleNext, handlePrev, handleGoToStep, handleNextClick, handlePrevClick,
    handleCustomImageUpload, handleOutlineChange, handleAcceptOutline,
    handleRemoveCustomImage, handleColourSelection: handleColourSelectionBase,
  } = logic;

  const parentStep = parentSteps[s.currentStep];
  const isFirstStep = s.currentStep === 0;
  const isLastStep = s.currentStep === parentSteps.length - 1;

  // Colour selection needs to also sync step-11 selectedOptions
  const handleColourSelection = async (colourValue: string, optionId: number) => {    // If user uploaded a custom image and hasn't completed/accepted the outline,
    // Colour clicks are disabled via the input component when drawing mode is active.

    const step11OptionIds = s.stepsData.steps.find((st) => st.id === 11)?.options?.map((o) => o.id) ?? [];
    s.setSelectedOptions((prev) => [...prev.filter((o) => !step11OptionIds.includes(o)), optionId]);
    await handleColourSelectionBase(colourValue, optionId, { customImage: s.customImage, compositeImage: s.compositeImage });
  };

  // ── Side-effects ──────────────────────────────────────────────────────────

  useEffect(() => {
    const checkAuth = async () => {
      const apiKEY = getApiKey();
      if (!apiKEY) { s.setAuthError("You're not authorized to use the EWI Materials Calculator."); s.setIsAuthorizing(false); return; }
      try {
        const res = await fetch(`https://veen-e.ewipro.com:7443/ewi-calculator/auth.php?apiKEY=${apiKEY}`, { headers: { Accept: "application/json" } });
        if (!res.ok) { s.setAuthError(`Connection problem. Please try again later... - E:${res.status}`); return; }
        const data = await res.json();
        if (data.authorized === 1) { s.setIsAuthorized(true); if (data.sessionnumber) s.setSessionNumber(data.sessionnumber); }
        else s.setAuthError("You're not authorized to use the EWI Materials Calculator.");
      } catch { s.setAuthError("Connection problem. Please try again later... - E:404"); }
      finally { s.setIsAuthorizing(false); }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const onResize = () => { s.setIsMobileView(globalThis.innerWidth <= 705); s.setIsSmallerTitle(globalThis.innerWidth <= 900); };
    globalThis.addEventListener("resize", onResize);
    return () => globalThis.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const h = (globalThis as any).__multiStepFormHandlers;
      if (h?.isStepComplete !== undefined) s.setIsStepComplete(h.isStepComplete);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (globalThis as any).__setFocusedSubstepImage = s.setFocusedSubstepImage;
    return () => { delete (globalThis as any).__setFocusedSubstepImage; };
  }, []);

  useEffect(() => {
    if (Number(s.values[3]) > 0)
      s.setCalculatedMaterials(calculateMaterials({ selectedOptions: s.selectedOptions, values: s.values, stepsData: s.stepsData }));
  }, [s.values, s.selectedOptions]);

  useEffect(() => {
    if (s.targetStepToReach === null || s.targetStepToReach === s.currentStep) { s.setTargetStepToReach(null); return; }
    const h = (globalThis as any).__multiStepFormHandlers;
    const timer = setTimeout(() => {
      if (s.targetStepToReach! < s.currentStep) (h?.handlePrevClick ?? handlePrev)();
      else (h?.handleNextClick ?? handleNext)();
    }, 1);
    return () => clearTimeout(timer);
  }, [s.targetStepToReach, s.currentStep]);

  // ── Helpers for handleOptionChange ────────────────────────────────────────

  const getStepsToSkip = (optionId: number): number[] =>
    s.stepsData.steps.flatMap(
      (st) => st.conditions
        ?.filter((c) => c.trigger_option === optionId)
        .flatMap((c) => c.skip_steps) ?? []
    );

  const clearStepValues = (n: Record<string, any>, stepId: number) => {
    const step = s.stepsData.steps.find((x) => x.id === stepId);
    if (!step) return;
    delete n[step.id];
    step.substeps?.forEach((sub) => clearStepValues(n, sub.id));
  };

  const clearStepJsonKeys = (n: Record<string, any>, stepId: number) => {
    const key = s.stepsData.steps.find((st) => st.id === stepId)?.json_key;
    if (key) delete n[key];
  };

  // ── Option change ─────────────────────────────────────────────────────────

  const handleOptionChange = (optionId: number, stepId: number) => {
    const stepOptionIds = s.stepsData.steps.find((st) => st.id === stepId)?.options?.map((o) => o.id) ?? [];
    const stepsToSkip = getStepsToSkip(optionId);

    s.setSelectedOptions((prev) => [...prev.filter((o) => !stepOptionIds.includes(o)), optionId]);

    if (stepsToSkip.length > 0) {
      s.setValues((prev) => {
        const n = { ...prev };
        stepsToSkip.forEach((id) => clearStepValues(n, id));
        return n;
      });
      s.setAccumulatedJsonData((prev) => {
        const n = { ...prev };
        stepsToSkip.forEach((id) => clearStepJsonKeys(n, id));
        return n;
      });
    }

    if (stepId === 1) {
      clearGeneratedImages();
      clearColourSelection();
      handleRemoveCustomImage();
    }

    if (stepId === 9) {
      const wasRender = s.selectedOptions.some((o) => RENDER_TYPE_IDS.has(o));
      const wasBricks = s.selectedOptions.includes(OPTION_IDS.RENDER_TYPE.BRICK_SLIPS);
      const isNowRender = RENDER_TYPE_IDS.has(optionId);
      const isNowBricks = optionId === OPTION_IDS.RENDER_TYPE.BRICK_SLIPS;
      if ((wasRender && isNowBricks) || (wasBricks && isNowRender)) { clearGeneratedImages(); clearColourSelection(); }
      const grainOption = s.stepsData.steps.find((st) => st.id === 10)?.options?.find((o) => o.option_value === s.values[10]);
      if (grainOption?.parent_option_id && !grainOption.parent_option_id.includes(optionId)) clearStepSelection(10);
    }

    if (stepId === 5) {
      const thicknessOption = s.stepsData.steps.find((st) => st.id === 6)?.options?.find((o) => o.option_value === s.values[6]);
      if (thicknessOption?.parent_option_id && !thicknessOption.parent_option_id.includes(optionId)) clearStepSelection(6);
    }
  };

  // ── Auth gates ────────────────────────────────────────────────────────────

  if (s.isAuthorizing) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 1 }}>Checking authorization...</Typography>
        <Typography variant="body2" color="text.secondary">Please wait</Typography>
      </Box>
    </Box>
  );

  if (!s.isAuthorized || s.authError) return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", px: 2 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 2, color: "error.main", fontWeight: 600 }}>Access Denied</Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>{s.authError ?? "You're not authorized to use the EWI Materials Calculator."}</Typography>
        <Typography variant="body2" color="text.secondary">Please contact your administrator for access.</Typography>
      </Box>
    </Box>
  );

  // ── Render ────────────────────────────────────────────────────────────────

  const selectedOptionImage =
    s.focusedSubstepImage ??
    parentStep.options?.find((o) => o.option_value === s.values[parentStep.id] || o.json_value === s.values[parentStep.id])?.image ??
    null;

  return (
    <>
      <Box sx={{ textAlign: "center", py: "16px" }}>
        <Typography sx={{ fontSize: s.isSmallerTitle ? "32px" : "48px", fontWeight: "extraLight", mb: "8px", transition: "font-size 240ms ease, transform 240ms ease", transform: s.isSmallerTitle ? "scale(0.95)" : "scale(1)", willChange: "font-size, transform" }}>
          Quote Smarter.
        </Typography>
        <Typography sx={{ fontSize: s.isSmallerTitle ? "32px" : "48px", fontWeight: 700, transition: "font-size 240ms ease, transform 240ms ease", transform: s.isSmallerTitle ? "scale(0.98)" : "scale(1)", willChange: "font-size, transform" }}>
          Use Our Material Calculator
        </Typography>
      </Box>

      <ResponsiveCalculatorWrapper isMobileView={s.isMobileView} defaultWidth={1265}>
        <Box sx={{ px: s.isMobileView ? "0px" : "1px", pb: "1px" }}>
          <Card ref={s.cardRef} elevation={0} sx={{
            position: "relative", m: "auto", my: "24px",
            pb: s.isMobileView ? "24px" : "0px",
            width: s.isMobileView ? "100%" : "1225px",
            height: s.isMobileView ? null : "680px",
            boxSizing: "border-box", borderRadius: "20px",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
          }}>
            {!s.isMobileView && (
              <ProcessFlow
                currentStep={s.currentStep} totalSteps={parentSteps.length} steps={parentSteps}
                onStepClick={handleGoToStep} completedSteps={s.completedSteps}
                isCurrentStepComplete={s.isStepComplete} isCurrentStepRequired={parentStep.required !== false}
                selectedOptions={s.selectedOptions}
              />
            )}

            <Box sx={{ display: s.isMobileView ? "block" : "flex", justifyContent: "space-between" }}>
              <StepHeader
                stepIndex={s.currentStep + 1} stepName={parentStep.step_name}
                image={parentStep.image} description={parentStep.description}
                maxSteps={parentSteps.length} helpAvailable={!!parentStep.help?.length}
                onHelpClick={() => s.setOpenHelp(true)} isMobile={s.isMobileView}
                selectedOptionImage={selectedOptionImage}
              />
              <FormBoard
                currentStep={s.currentStep} totalSteps={parentSteps.length} parentStep={parentStep}
                onNext={handleNext} onPrev={handlePrev}
                onOptionChange={(option) => handleOptionChange(option.id, option.stepId)}
                isMobile={s.isMobileView} values={s.values} setValues={s.setValues}
                errors={s.errors} setErrors={s.setErrors}
                selectedOptions={s.selectedOptions} setSelectedOptions={s.setSelectedOptions}
                stepsData={s.stepsData} customImage={s.customImage} isDrawingMode={s.isDrawingMode}
                onOutlineChange={handleOutlineChange} canCompleteOutline={s.canCompleteOutline}
                onCustomImageUpload={handleCustomImageUpload}
                onAcceptOutline={() => handleAcceptOutline(s.customImage)}
                onRemoveCustomImage={handleRemoveCustomImage}
                onColourSelection={handleColourSelection}
                isGeneratingImage={s.isGeneratingImage} generatedImage={s.generatedImage}
                calculatedMaterials={s.calculatedMaterials}
              />
            </Box>

            {s.isMobileView ? (
              <Box sx={{ display: "flex", gap: "8px", px: "24px", mt: "24px", alignItems: "center" }}>
                <Box sx={{ flex: 1 }}>{!isFirstStep && <ActionButton onClick={handlePrevClick} isMobile variant="prev" />}</Box>
                <Box sx={{ flex: 2 }}>{!!parentStep.help?.length && <HelpButton helpAvailable isMobile onHelpClick={() => s.setOpenHelp(true)} />}</Box>
                <Box sx={{ flex: 1 }}><ActionButton onClick={handleNextClick} isMobile variant={isLastStep ? "send" : "next"} disabled={!s.isStepComplete} /></Box>
              </Box>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mr: "24px", mt: "24px" }}>
                <img src={EwiproLogo} alt="Ewipro Logo" style={{ height: "40px" }} />
              </Box>
            )}

            <Help open={s.openHelp} onClose={() => s.setOpenHelp(false)} helpSections={parentStep.help ?? []}
              isMobile={s.isMobileView} container={s.cardRef.current}
              selectedOptions={s.selectedOptions} OPTION_IDS={OPTION_IDS}
            />
          </Card>
        </Box>
      </ResponsiveCalculatorWrapper>

      <Snackbar open={s.snackbarOpen} autoHideDuration={20000} onClose={() => s.setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} sx={{ mt: 2 }}>
        <Alert onClose={() => s.setSnackbarOpen(false)} severity={s.snackbarSeverity} variant="filled" sx={{
          width: "100%", minWidth: "400px", fontSize: "16px", fontWeight: 500,
          boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
          "& .MuiAlert-icon": { fontSize: "28px" },
          "& .MuiAlert-message": { padding: "8px 0" },
        }}>
          {s.snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Calculator;