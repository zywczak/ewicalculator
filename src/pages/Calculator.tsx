import React, { useEffect, useState, useRef } from "react";
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
import { imageApi } from "../services/imageApi";
import { imageGenerationService } from "../services/imageGenerationService";
import { findBestMatchingImage } from "../data/images/utils";
import address from "../api/adress";
import OPTION_IDS from '../data/constants/optionIds';

const Calculator: React.FC = () => {
  const [stepsData] = useState<StepsData>(STEPS_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([]));
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 705);
  const [isSmallerTitle, setIsSmallerTitle] = useState(window.innerWidth <= 900);
  const [targetStepToReach, setTargetStepToReach] = useState<number | null>(null);

  // Fetch color data and trigger preloading IMMEDIATELY on mount
  useEffect(() => {
    // Start fetching and preloading colors as soon as component mounts
    import('../data/colorCache').then(({ initializeColorPreloading }) => {
      initializeColorPreloading();
      console.log('Color preloading initialized');
    }).catch(err => {
      console.error('Failed to initialize color preloading:', err);
    });
  }, []); // Empty dependency array - runs once on mount

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

  // Custom image states
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [outlinePoints, setOutlinePoints] = useState<any[]>([]);
  const [canCompleteOutline, setCanCompleteOutline] = useState(false);
  const [outlineMask, setOutlineMask] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

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

    // Resetuj kolor Brick Slips jeśli zmieniono typ tynku na inny niż Brick Slips
    if (stepId === 9) { // 9 = render type
      if (optionId !== OPTION_IDS.RENDER_TYPE.BRICK_SLIPS) {
        setValues(prev => {
          const newValues = { ...prev };
          delete newValues[11];
          return newValues;
        });
      }
    }
  };

  const handleCustomImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCustomImage(reader.result as string);
      
      // Reset colour selection (step 11) when switching to custom image
      setValues(prev => {
        const newValues = { ...prev };
        delete newValues[11];
        return newValues;
      });
      
      // Check if we need drawing mode (semi-detached or terraced)
      const houseType = selectedOptions.find(opt => 
        opt === 1 || opt === 2 || opt === 3 // TERRACED (1), SEMI_DETACHED (2), DETACHED (3)
      );
      
      // Enable drawing mode ONLY for semi-detached (2) and terraced (1)
      // DETACHED (3) does NOT need drawing mode
      if (houseType === 1 || houseType === 2) {
        setIsDrawingMode(true);
      } else {
        setIsDrawingMode(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleOutlineChange = (points: any[], canComplete: boolean) => {
    setOutlinePoints(points);
    setCanCompleteOutline(canComplete);
  };

  const handleAcceptOutline = () => {
    // Create and save the outline mask using a dynamically sized canvas
    if (customImage && outlinePoints.length >= 3) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Fill background black (areas not to change)
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Fill outline area white (areas to change)
          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.moveTo(outlinePoints[0].x, outlinePoints[0].y);
          outlinePoints.forEach(point => {
            ctx.lineTo(point.x, point.y);
          });
          ctx.closePath();
          ctx.fill();

          const mask = canvas.toDataURL();
          setOutlineMask(mask);
          console.log("Outline mask created and saved");
        }
      };
      img.src = customImage;
    }
    
    setIsDrawingMode(false);
    console.log("Outline accepted:", outlinePoints);
  };

  const handleRemoveCustomImage = () => {
    setCustomImage(null);
    setGeneratedImage(null);
    setIsDrawingMode(false);
    setOutlinePoints([]);
    setCanCompleteOutline(false);
    setOutlineMask(null);
    
    // Reset colour selection (step 11) when switching back to default image
    setValues(prev => {
      const newValues = { ...prev };
      delete newValues[11];
      return newValues;
    });
  };

  const handleColourSelection = async (colourValue: string, optionId: number) => {
    console.log("Colour selected:", colourValue, "Option ID:", optionId);
    
    // Check if we already have a generated image for this colour
    const cached = imageGenerationService.getGeneratedImage(11, optionId);
    if (cached) {
      console.log("Using cached image for colour:", colourValue);
      setGeneratedImage(cached.imageUrl);
      return;
    }

    setIsGeneratingImage(true);

    try {
      // Simulate 10s generation delay
      await new Promise(resolve => setTimeout(resolve, 10000));

      // Get base image
      let baseImageUrl: string;
      
      if (customImage) {
        // Use custom uploaded image
        baseImageUrl = customImage;
      } else {
        // Use default predefined image
        const predefImage = findBestMatchingImage(selectedOptions);
        baseImageUrl = predefImage ? address + predefImage : '';
      }

      if (!baseImageUrl) {
        console.error("No base image available");
        setIsGeneratingImage(false);
        return;
      }

      // // Get step data for prompt
      // const step11 = stepsData.steps.find(s => s.id === 11);
      // const promptTemplate = step11?.aiImagePrompt || "Change the facade color to {option_value}";
      // const prompt = promptTemplate.replace('{option_value}', colourValue);

      // console.log("Generating image with prompt:", prompt);
      // console.log("Base image:", baseImageUrl.substring(0, 50));
      // console.log("Using outline mask:", outlineMask ? "Yes" : "No");

      // // Call AI API
      // const result = await imageApi.generateImage({
      //   imageUrl: baseImageUrl,
      //   prompt
      // });


      // if (result.success && result.imageUrl) {
      //   console.log("Image generated successfully");
      //   setGeneratedImage(result.imageUrl);
        
      //   // Cache the generated image
      //   imageGenerationService.saveGeneratedImage({
      //     stepId: 11,
      //     optionId,
      //     imageUrl: result.imageUrl,
      //     timestamp: Date.now()
      //   });
      // } else {
      //   console.error("Image generation failed:", result.error);
      // }
      // Simulate image generation by overlaying text
      const simulatedImageUrl = await new Promise<string>((resolve) => {
        const img = new globalThis.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            ctx.font = 'bold 48px Arial';
            ctx.fillStyle = 'rgba(255,0,0,0.7)';
            ctx.textAlign = 'center';
            ctx.fillText('Wygenerowano: ' + colourValue, canvas.width / 2, canvas.height / 2);
            resolve(canvas.toDataURL());
          } else {
            resolve(baseImageUrl);
          }
        };
        img.onerror = () => resolve(baseImageUrl);
        img.src = baseImageUrl;
      });

      setGeneratedImage(simulatedImageUrl);
      imageGenerationService.saveGeneratedImage({
        stepId: 11,
        optionId,
        imageUrl: simulatedImageUrl,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGeneratingImage(false);
    }
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
          Quote Smarter.
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
          Use Our Material Calculator
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
                image={parentStep.image}
                description={parentStep.description}
                maxSteps={parentSteps.length}
                helpAvailable={!!parentStep.help?.length}
                onHelpClick={() => {
                  setOpenHelp(true);
                }}
                isMobile={isMobileView}
                selectedOptionImage={(() => {
                  const stepValue = values[parentStep.id];
                  // Najpierw statyczne
                  const staticOpt = parentStep.options?.find?.(o => o.option_value === stepValue);
                  if (staticOpt?.image) return staticOpt.image;
                  // Potem dynamiczne (z cache, bo fetchColorsOnce jest async)
                  if (parentStep.id === 11 && (globalThis as any).__colorCache) {
                    const apiOpt = (globalThis as any).__colorCache?.find?.((c: any) => c.colour_code === stepValue);
                    return apiOpt?.photo_uri ?? null;
                  }
                  return null;
                })()}
              />
              <FormBoard
                currentStep={currentStep}
                totalSteps={parentSteps.length}
                parentStep={parentStep}
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
                customImage={customImage}
                isDrawingMode={isDrawingMode}
                onOutlineChange={handleOutlineChange}
                canCompleteOutline={canCompleteOutline}
                onCustomImageUpload={handleCustomImageUpload}
                onAcceptOutline={handleAcceptOutline}
                onRemoveCustomImage={handleRemoveCustomImage}
                onColourSelection={handleColourSelection}
                isGeneratingImage={isGeneratingImage}
                generatedImage={generatedImage}
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
              selectedOptions={selectedOptions}
              OPTION_IDS={OPTION_IDS}
            />
          </Card>
        </Box>
      </ResponsiveCalculatorWrapper>
    </>
  );
};

export default Calculator;