import React, { useEffect, useState, useRef } from "react";//, useNemo
import { Box, Card, Typography } from "@mui/material";
import ProcessFlow from "../components/flow/ProcessFlow";
import StepHeader from "../components/form/Step/StepHeader";
import EwiproLogo from "../assets/EWI-Pro-Render-Systems.png";
import FormBoard from "../components/Form";

import ActionButton from "../components/form/buttons/actionButton";
import HelpButton from "../components/form/buttons/helpButton";
import ResponsiveCalculatorWrapper from "../components/FormWrapper";

import { STEPS_DATA} from "../data/steps/stepsData";
import { StepsData } from "../data/steps/types";
import Help from "../components/help/Help";
//import { useAIAssistantWS } from "../webSocket/useAIAssistantWS";

const Calculator: React.FC = () => {
  const [stepsData] = useState<StepsData>(STEPS_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([]));
  const [skipStepIds,] = useState<number[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 705);
  const [isSmallerTitle, setIsSmallerTitle] = useState(window.innerWidth <= 900);
  const [targetStepToReach, setTargetStepToReach] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 705);
      setIsSmallerTitle(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [values, setValues] = useState<Record<number, string | number>>({});
  const [errors, setErrors] = useState<Record<number, boolean>>({});

  const [openHelp, setOpenHelp] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isStepComplete, setIsStepComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const handlers = (globalThis as any).__multiStepFormHandlers;
      if (handlers?.isStepComplete !== undefined) {
        setIsStepComplete(handlers.isStepComplete);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (targetStepToReach === null || targetStepToReach === currentStep) {
      setTargetStepToReach(null);
      return;
    }

    const timer = setTimeout(() => {
      if (targetStepToReach < currentStep) {
        const handlers = (globalThis as any).__multiStepFormHandlers;
        if (handlers?.handlePrevClick) {
          handlers.handlePrevClick();
        } else {
          handlePrev();
        }
      } else if (targetStepToReach > currentStep) {
        const handlers = (globalThis as any).__multiStepFormHandlers;
        if (handlers?.handleNextClick) {
          handlers.handleNextClick();
        } else {
          handleNext();
        }
      }
    }, 1);

    return () => clearTimeout(timer);
  }, [targetStepToReach, currentStep]);

  const handleOptionChange = (optionId: number, stepId: number) => {
    setSelectedOptions(prev => {
      const stepOptions = stepsData.steps.find(s => s.id === stepId)?.options?.map(o => o.id) || [];
      const filtered = prev.filter(opt => !stepOptions.includes(opt));
      return [...filtered, optionId];
    });
  };

  const parentSteps = stepsData.steps
    .filter(step => !step.parent)
    .sort((a, b) => a.id - b.id);

  const isStepSkipped = (stepIndex: number, selectedOpts: number[]) => {
    const step = parentSteps[stepIndex];
    return parentSteps
      .slice(0, stepIndex)
      .some(prevStep =>
        prevStep.conditions?.some(cond =>
          cond.skip_steps.includes(step.id) &&
          selectedOpts.includes(cond.trigger_option)
        )
      );
  };

  const handleNext = (
    values?: Record<string, string | number | Record<string, any>>,
    triggerStepId?: number,
    selectedOptionId?: number
  ) => {
    let effectiveSelected = selectedOptions;
    if (selectedOptionId !== undefined && triggerStepId !== undefined) {
      const stepOptions = stepsData.steps.find(s => s.id === triggerStepId)?.options?.map(o => o.id) || [];
      effectiveSelected = effectiveSelected.filter(opt => !stepOptions.includes(opt));
      if (!effectiveSelected.includes(selectedOptionId)) effectiveSelected = [...effectiveSelected, selectedOptionId];
    }

    let nextStep = currentStep + 1;

    while (nextStep < parentSteps.length) {
      const step = parentSteps[nextStep];

      const shouldSkip = parentSteps
        .slice(0, nextStep)
        .some(prevStep =>
          prevStep.conditions?.some(cond =>
            cond.skip_steps.includes(step.id) &&
            effectiveSelected.includes(cond.trigger_option)
          )
        );

      if (!shouldSkip) break;
      nextStep++;
    }

    if (selectedOptionId !== undefined && triggerStepId !== undefined) {
      setSelectedOptions(effectiveSelected);
    }

    const newStep = Math.min(nextStep, parentSteps.length - 1);
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    setCurrentStep(newStep);
  };

  const handlePrev = () => {
    let prevStep = currentStep - 1;

    while (prevStep >= 0) {
      const step = parentSteps[prevStep];

      const shouldSkip = parentSteps
        .slice(0, prevStep)
        .some(prevStep2 =>
          prevStep2.conditions?.some(cond =>
            cond.skip_steps.includes(step.id) &&
            selectedOptions.includes(cond.trigger_option)
          )
        );

      if (!shouldSkip) break;
      prevStep--;
    }

    const allowedStepIds = new Set<number>(
      parentSteps
        .slice(0, Math.max(prevStep + 1, 0))
        .flatMap(step => step.options?.map(o => o.id) ?? [])
    );
    setSelectedOptions(prev => prev.filter(optId => allowedStepIds.has(optId)));

    const newPrevStep = Math.max(prevStep, 0);

    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      for (let i = newPrevStep; i < parentSteps.length; i++) {
        newSet.delete(i);
      }
      return newSet;
    });
    setCurrentStep(newPrevStep);
  };

  const handleGoToStep = (targetStep: number) => {
    if (isStepSkipped(targetStep, selectedOptions)) return;

    setTargetStepToReach(targetStep);
  };

  const parentStep = parentSteps[currentStep];

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === parentSteps.length - 1;

  const handleNextClick = () => {
    const handlers = (globalThis as any).__multiStepFormHandlers;
    if (handlers?.handleNextClick) {
      handlers.handleNextClick();
    }
  };

  const handlePrevClick = () => {
    const handlers = (globalThis as any).__multiStepFormHandlers;
    if (handlers?.handlePrevClick) {
      handlers.handlePrevClick();
    }
  };

  // const userInfo = useMemo(() => ({
  //   userID: localStorage.getItem("userID") ?? "",
  //   userName: localStorage.getItem("userName") ?? "",
  //   userNameSurname: localStorage.getItem("userNameSurname") ?? "",
  //   position: "test",
  //   userBranchID: "test",
  //   userBranchName: "test",
  //   userDepartmentName: "test"
  // }), []);

  // const { messages, status, sendMessage } = useAIAssistantWS(userInfo);
  // const [aiHint, setAiHint] = React.useState<string>("");

  // React.useEffect(() => {
  //   if (status === "connected") {
  //     setAiHint("");
  //     sendMessage("czesc");
  //   }
  // }, [status, sendMessage, currentStep]);

  // React.useEffect(() => {
  //   const lastMessage = messages[messages.length - 1];
  //   if (lastMessage && lastMessage.role === "assistant" && !lastMessage.streaming) {
  //     setAiHint(lastMessage.content);
  //   }
  // }, [messages]);

  return (
    <>
      <Box sx={{ textAlign: "center", py: "16px" }}>
        <Typography
          sx={{
            fontSize: isSmallerTitle ? "32px" : "48px",
            fontWeight: "extraLight",
            mb: "8px",
            transition: "font-size 240ms ease, transform 240ms ease",
            transform: isSmallerTitle ? "scale(0.95)" : "scale(1)",
            willChange: "font-size, transform",
          }}
        >
          Quote smarter.
        </Typography>
        <Typography
          sx={{
            fontSize: isSmallerTitle ? "32px" : "48px",
            fontWeight: 700,
            transition: "font-size 240ms ease, transform 240ms ease",
            transform: isSmallerTitle ? "scale(0.98)" : "scale(1)",
            willChange: "font-size, transform",
          }}
        >
          Use Material Calculator
        </Typography>


      </Box>
      <ResponsiveCalculatorWrapper
        isMobileView={isMobileView}
        defaultWidth={1265}
      >
        <Box sx={{ px: isMobileView ? "0px" : "1px", pb: "1px" }}>
          <Card
            ref={cardRef}
            elevation={0}
            sx={{
              position: 'relative',
              m: "auto",
              my: "24px",
              pb: isMobileView ? "24px" : "0px",
              width: isMobileView ? '100%' : '1225px',
              height: isMobileView ? null : '680px',
              boxSizing: 'border-box',
              borderRadius: "20px",
              boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
            }}
          >
            {isMobileView ? null : <ProcessFlow currentStep={currentStep} totalSteps={parentSteps.length} steps={parentSteps} onStepClick={handleGoToStep} completedSteps={completedSteps} isCurrentStepComplete={isStepComplete} isCurrentStepRequired={parentStep.required !== false} selectedOptions={selectedOptions} />}

            <Box
              sx={{
                display: isMobileView ? 'block' : 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <StepHeader
                stepIndex={currentStep + 1}
                stepName={parentStep.step_name}
                description={parentStep.description}
                maxSteps={parentSteps.length}
                helpAvailable={!!parentStep.help?.length}
                onHelpClick={() => {
                  setOpenHelp(true);
                }}
                isMobile={isMobileView}
                selectedOptionImage={
                  (() => {
                    const stepValue = values[parentStep.id];
                    const selectedOption = parentStep.options?.find(o => o.option_value === stepValue);
                    return selectedOption?.image || null;
                  })()
                }
                // aiHint={aiHint}
              />
              <FormBoard
                currentStep={currentStep}
                totalSteps={parentSteps.length}
                parentStep={parentStep}
                skipStepIds={skipStepIds}
                onNext={handleNext}
                onPrev={handlePrev}
                onOptionChange={(option) => handleOptionChange(option.id, option.stepId)}
                isMobile={isMobileView}
                values={values}
                setValues={setValues}
                errors={errors}
                setErrors={setErrors}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                stepsData={stepsData}
              />
            </Box>
            {isMobileView ? (
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  px: "24px",
                  mt: "24px",
                  alignItems: "center",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  {!isFirstStep && (
                    <ActionButton
                      onClick={handlePrevClick}
                      isMobile
                      variant="prev"
                    />
                  )}
                </Box>

                <Box sx={{ flex: 2 }}>
                  {!!parentStep.help?.length && (
                    <HelpButton
                      helpAvailable
                      isMobile
                      onHelpClick={() => {
                        setOpenHelp(true);
                      }}
                    />
                  )}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <ActionButton
                    onClick={handleNextClick}
                    isMobile
                    variant={isLastStep ? "send" : "next"}
                    disabled={!isStepComplete}
                  />
                </Box>
              </Box>
            ) : <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: "24px", mt: "24px" }}>
              <img
                src={EwiproLogo}
                alt="Ewipro Logo"
                style={{ height: "40px" }}
              />
            </Box>}

            <Help
              open={openHelp}
              onClose={() => setOpenHelp(false)}
              helpSections={parentStep.help || []}
              isMobile={isMobileView}
              container={cardRef.current}
            />
          </Card>
        </Box>
      </ResponsiveCalculatorWrapper>
    </>
  );
};

export default Calculator;