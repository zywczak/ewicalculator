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
import { findBestMatchingImage, findFileToSend } from "../data/images/utils";
import address from "../api/adress";
import OPTION_IDS from '../data/constants/optionIds';

// Simple cache for generated images
const generatedImageCache = new Map<string, { imageUrl: string; timestamp: number }>();

const getCacheKey = (stepId: number, optionId: number, selectedOptions: number[]) => {
  // Include house type and surface material in cache key
  const houseType = selectedOptions.find(opt => 
    opt === OPTION_IDS.HOUSE.DETACHED || 
    opt === OPTION_IDS.HOUSE.SEMI_DETACHED || 
    opt === OPTION_IDS.HOUSE.TERRACED
  ) || 0;
  
  const surface = selectedOptions.find(opt => 
    Object.values(OPTION_IDS.SURFACE).includes(opt)
  ) || 0;
  
  return `${stepId}-${optionId}-${houseType}-${surface}`;
};

// Utility function to compress image
const compressImage = async (blob: Blob, maxWidth: number = 1920, quality: number = 0.8): Promise<Blob> => {
  const ONE_MB = 1024 * 1024; // 1MB in bytes
  
  // Skip compression if file is smaller than 1MB
  if (blob.size < ONE_MB) {
    console.log(`Image size ${(blob.size / 1024).toFixed(2)}KB - skipping compression (< 1MB)`);
    return blob;
  }
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      // Calculate new dimensions
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      // Create canvas and compress
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (compressedBlob) => {
          if (compressedBlob) {
            console.log(`Image compressed: ${(blob.size / 1024).toFixed(2)}KB -> ${(compressedBlob.size / 1024).toFixed(2)}KB`);
            resolve(compressedBlob);
          } else {
            reject(new Error('Compression failed'));
          }
        },
        'image/jpeg',
        quality
      );
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
};

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
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const [compositeImage, setCompositeImage] = useState<string | null>(null);

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

    // Clear cache and generated image when house type changes (step 1)
    if (stepId === 1) {
      generatedImageCache.clear();
      setGeneratedImage(null);
      console.log("House type changed - cleared AI generated images cache");
    }

    // Clear cache and generated image when surface material changes (step 2)
    if (stepId === 2) {
      generatedImageCache.clear();
      setGeneratedImage(null);
      console.log("Surface material changed - cleared AI generated images cache");
    }

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
      
      // Clear all generated images and cache when uploading new custom image
      setGeneratedImage(null);
      setCompositeImage(null);
      setOutlinePoints([]);
      sessionStorage.removeItem('compositeHouseImage');
      
      // Clear the entire cache - all AI generated images from previous custom image
      generatedImageCache.clear();
      console.log("New custom image uploaded - cleared all AI generated images and cache");
      
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
    if (customImage && outlinePoints.length >= 3) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = 'white';
          ctx.beginPath();
          ctx.moveTo(outlinePoints[0].x * img.width, outlinePoints[0].y * img.height);
          outlinePoints.forEach(point => {
            ctx.lineTo(point.x * img.width, point.y * img.height);
          });
          ctx.closePath();
          ctx.fill();

          const mask = canvas.toDataURL();
          console.log("Outline mask created and saved");

          // Create composite image (custom image + red overlay)
          createCompositeImage(customImage, mask);
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
    setCompositeImage(null);
    
    sessionStorage.removeItem('compositeHouseImage');
    
    // Reset colour selection (step 11) when switching back to default image
    setValues(prev => {
      const newValues = { ...prev };
      delete newValues[11];
      return newValues;
    });
  };

  const handleColourSelection = async (colourValue: string, optionId: number) => {
    console.log("Colour selected:", colourValue, "Option ID:", optionId);

    const cacheKey = getCacheKey(11, optionId, selectedOptions);
    const cached = generatedImageCache.get(cacheKey);
    if (cached) {
      setGeneratedImage(cached.imageUrl);
      return;
    }

    setIsGeneratingImage(true);

    try {
      let baseImageUrl: string;
      let imageToSend: Blob;

      // Use composite image if available (has red overlay showing area to change)
      if (compositeImage) {
        console.log("Using composite image from session storage");
        const compositeFromSession = sessionStorage.getItem('compositeHouseImage');
        baseImageUrl = compositeFromSession || compositeImage;
        
        const response = await fetch(baseImageUrl);
        imageToSend = await response.blob();
      } else if (customImage) {
        console.log("Using custom image without mask");
        baseImageUrl = customImage;
        const response = await fetch(baseImageUrl);
        imageToSend = await response.blob();
      } else {
        const predefImage = findBestMatchingImage(selectedOptions);
        baseImageUrl = predefImage ? address + predefImage : '';
        
        if (!baseImageUrl) {
          console.error("No base image available");
          return;
        }

        const imageResponse = await fetch(baseImageUrl);
        imageToSend = await imageResponse.blob();
      }

      // Compress image before sending to reduce payload size
      console.log(`Original image size: ${(imageToSend.size / 1024).toFixed(2)}KB`);
      imageToSend = await compressImage(imageToSend, 1920, 0.85);

      const formData = new FormData();
      let fileToSend: Blob = imageToSend;
      let fileName = "house.jpg";
      
      // If user didn't upload custom image, use house-type specific file
      if (!customImage && !compositeImage) {
        const fileUrl = findFileToSend(selectedOptions);
        if (fileUrl) {
          console.log("Using file for AI:", fileUrl);
          try {
            const fileResponse = await fetch(address + fileUrl);
            let fileBlob = await fileResponse.blob();
            
            // Compress file
            console.log(`Original file size: ${(fileBlob.size / 1024).toFixed(2)}KB`);
            fileBlob = await compressImage(fileBlob, 1920, 0.9);
            
            // Send this file to AI
            fileToSend = fileBlob;
            fileName = fileUrl.includes("default") ? "default.jpg" : "mask.png";
            formData.append("file", fileBlob, fileName);
          } catch (error) {
            console.warn("Failed to load file, using base image:", error);
            formData.append("file", imageToSend, "house.jpg");
          }
        } else {
          // No file found, send base image
          formData.append("file", imageToSend, "house.jpg");
        }
      } else {
        // Custom image - send the user's image
        formData.append("file", imageToSend, "house.jpg");
      }
      
      console.log(`Sending ${fileName} (${(fileToSend.size / 1024).toFixed(2)}KB) to AI`);
      
      formData.append("mode", "STRICT");

      const isBrickSlips = selectedOptions.includes(OPTION_IDS.RENDER_TYPE.BRICK_SLIPS);
      if (isBrickSlips) {
        formData.append("material", "BRICK_SLIP");
        formData.append("colour_code", colourValue);
      } else {
        formData.append("material", "RENDER");
        formData.append("colour_code", colourValue);
      }
      console.log("FormData prepared with colour code:", colourValue);

      const response = await fetch(
        "https://veen-e.ewipro.com:7443/aidriver/edit_house",
        {
          method: "POST",
          headers: {
            Authorization: "51e904be14b69f404b782149c16681c3"
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error("AI generation failed");
      }

      const resultBlob = await response.blob();
      const generatedImageUrl = URL.createObjectURL(resultBlob);

      setGeneratedImage(generatedImageUrl);

      generatedImageCache.set(cacheKey, {
        imageUrl: generatedImageUrl,
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

    // Reset house preview and colour selection when moving away from step 11 (colour step)
    const colourStepIndex = parentSteps.findIndex(s => s.id === 11);
    if (currentStep === colourStepIndex) {
      // Reset colour value for step 11 (works for both Render and Brick Slips)
      setValues(prev => {
        const newValues = { ...prev };
        delete newValues[11];
        return newValues;
      });

      // Reset generated image to custom or default preview
      if (customImage) {
        setGeneratedImage(customImage);
      } else {
        const predefImage = findBestMatchingImage(selectedOptions);
        setGeneratedImage(predefImage ? address + predefImage : null);
      }
    }

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

  const createCompositeImage = (baseImage: string, mask: string) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw base image
      ctx.drawImage(img, 0, 0);

      // Load and draw mask
      const maskImg = new Image();
      maskImg.onload = () => {
        // Get mask data to find white areas
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = img.width;
        maskCanvas.height = img.height;
        const maskCtx = maskCanvas.getContext('2d');
        
        if (maskCtx) {
          maskCtx.drawImage(maskImg, 0, 0, img.width, img.height);
          const maskData = maskCtx.getImageData(0, 0, img.width, img.height);
          
          // Draw BRIGHT RED overlay on white areas (areas to change)
          ctx.fillStyle = 'rgba(255, 0, 0, 0.7)'; // Bright red with 70% opacity
          ctx.strokeStyle = 'rgba(255, 0, 0, 1.0)'; // Solid red border
          ctx.lineWidth = 5;
          
          // Find contours and fill
          for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
              const index = (y * img.width + x) * 4;
              // If pixel is white in mask (area to change)
              if (maskData.data[index] > 200) {
                ctx.fillRect(x, y, 1, 1);
              }
            }
          }
          
          // Draw outline of the mask area with thick red line
          ctx.globalCompositeOperation = 'source-over';
          ctx.beginPath();
          // Convert outline points to canvas coordinates
          outlinePoints.forEach((point, index) => {
            const x = point.x * img.width;
            const y = point.y * img.height;
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });
          ctx.closePath();
          ctx.stroke();

          const composite = canvas.toDataURL('image/png');
          setCompositeImage(composite);
          
          // Save to session storage
          sessionStorage.setItem('compositeHouseImage', composite);
          
          console.log("Composite image created with RED overlay - this will be sent to AI");
        }
      };
      maskImg.src = mask;
    };
    img.src = baseImage;
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
                compositeImage={compositeImage}
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