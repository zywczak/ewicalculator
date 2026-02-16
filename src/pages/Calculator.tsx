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
import { findBestMatchingImage } from "../data/images/utils";
import address from "../api/adress";
import OPTION_IDS from '../data/constants/optionIds';
import { calculateMaterials, CalculatedMaterials } from "../services/materialCalculator";

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
    Object.values(OPTION_IDS.SURFACE).includes(opt as any)
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
  // Authorization states
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [sessionNumber, setSessionNumber] = useState<number>(0);

  const [stepsData] = useState<StepsData>(STEPS_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([]));
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 705);
  const [isSmallerTitle, setIsSmallerTitle] = useState(window.innerWidth <= 900);
  const [targetStepToReach, setTargetStepToReach] = useState<number | null>(null);

  // Authorization check - MUST run first before loading calculator
  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        // Extract apiKEY from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const apiKEY =  urlParams.get('apiKEY') || import.meta.env.VITE_API_KEY;

        if (!apiKEY) {
          setAuthError("You're not authorized to use the EWI Materials Calculator.");
          setIsAuthorizing(false);
          return;
        }

        console.log('🔐 Checking authorization with apiKEY:', apiKEY);

        // Send GET request to auth.php
        const response = await fetch(
          `https://veen-e.ewipro.com:7443/ewi-calculator/auth.php?apiKEY=${apiKEY}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          setAuthError(`Connection problem. Please try again later... - E:${response.status}`);
          setIsAuthorizing(false);
          return;
        }

        const data = await response.json();
        console.log('🔐 Authorization response:', data);

        if (data.authorized === 1) {
          // ✅ Authorization successful
          setIsAuthorized(true);
                   
          // Set session number if provided
          if (data.sessionnumber) {
            setSessionNumber(data.sessionnumber);
            console.log('📋 Session number:', data.sessionnumber);
          }
          
          console.log('✅ Authorization successful - loading calculator');
        } else {
          // ❌ Not authorized
          setAuthError("You're not authorized to use the EWI Materials Calculator.");
        }
      } catch (error) {
        console.error('❌ Authorization error:', error);
        setAuthError('Connection problem. Please try again later... - E:404');
      } finally {
        setIsAuthorizing(false);
      }
    };

    checkAuthorization();
  }, []);

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
  const [generatedImageBase64, setGeneratedImageBase64] = useState<string | null>(null);

  const [compositeImage, setCompositeImage] = useState<string | null>(null);

  const [isStepComplete, setIsStepComplete] = useState(false);
  const [calculatedMaterials, setCalculatedMaterials] = useState<CalculatedMaterials | null>(null);
  
  // Track focused substep image for display in StepHeader
  const [focusedSubstepImage, setFocusedSubstepImage] = useState<string | null>(null);
  
  // LogID state - śledzenie sesji użytkownika (jak w starym kalkulatorze)
  const [logID, setLogID] = useState<number>(0);
  
  // Accumulated JSON data from all steps (built via onNext)
  const [accumulatedJsonData, setAccumulatedJsonData] = useState<Record<string, any>>({});

  // Calculate parent steps early for use in useEffect
  const parentSteps = stepsData.steps
    .filter(step => !step.parent)
    .sort((a, b) => a.id - b.id);

  useEffect(() => {
    const interval = setInterval(() => {
      const handlers = (globalThis as any).__multiStepFormHandlers;
      if (handlers?.isStepComplete !== undefined) {
        setIsStepComplete(handlers.isStepComplete);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Expose setFocusedSubstepImage to NumberStepInput via window
  useEffect(() => {
    (window as any).__setFocusedSubstepImage = setFocusedSubstepImage;
    return () => {
      delete (window as any).__setFocusedSubstepImage;
    };
  }, []);

  // Calculate materials whenever values or selectedOptions change
  useEffect(() => {
    const surfaceArea = Number(values[3]) || 0; // Step 3 - Surface Area
    const systemType = selectedOptions.find(opt => 
      opt === OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER || 
      opt === OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY
    );
    const insulationType = selectedOptions.find(opt => 
      opt === OPTION_IDS.INSULATION.EPS || 
      opt === OPTION_IDS.INSULATION.WOOL || 
      opt === OPTION_IDS.INSULATION.KINGSPAN ||
      opt === OPTION_IDS.INSULATION.WOOD_FIBRE
    );
    const thicknessOpt = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.THICKNESS).includes(opt as any)
    );
    const renderType = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.RENDER_TYPE).includes(opt as any)
    );
    const grainSize = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.GRAINSIZE).includes(opt as any)
    );
    const surfaceMaterial = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.SURFACE).includes(opt as any)
    );
    const fixingsType = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.FIXINGS).includes(opt as any)
    );

    // Get thickness value from option ID
    let thickness: number | undefined;
    if (thicknessOpt) {
      const thicknessEntry = Object.entries(OPTION_IDS.THICKNESS).find(
        ([, id]) => id === thicknessOpt
      );
      if (thicknessEntry) {
        thickness = parseInt(thicknessEntry[0].replace('MM', ''));
      }
    }

    if (surfaceArea > 0 && systemType) {
      const calculated = calculateMaterials({
        surfaceArea,
        systemType,
        insulationType,
        thickness,
        renderType,
        grainSize,
        fixingsType,
        surfaceMaterial,
        selectedOptions,
        values
      });
      setCalculatedMaterials(calculated);
      console.log('Calculated materials:', calculated);
    }
  }, [values, selectedOptions]);

  // Calculate materials whenever values or selectedOptions change
  useEffect(() => {
    const surfaceArea = Number(values[3]) || 0; // Step 3 - Surface Area
    const systemType = selectedOptions.find(opt => 
      opt === OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER || 
      opt === OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY
    );
    const insulationType = selectedOptions.find(opt => 
      opt === OPTION_IDS.INSULATION.EPS || 
      opt === OPTION_IDS.INSULATION.WOOL || 
      opt === OPTION_IDS.INSULATION.KINGSPAN ||
      opt === OPTION_IDS.INSULATION.WOOD_FIBRE
    );
    const thicknessOpt = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.THICKNESS).includes(opt as any)
    );
    const renderType = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.RENDER_TYPE).includes(opt as any)
    );
    const grainSize = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.GRAINSIZE).includes(opt as any)
    );
    const surfaceMaterial = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.SURFACE).includes(opt as any)
    );
    const fixingsType = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.FIXINGS).includes(opt as any)
    );

    // Get thickness value from option ID
    let thickness: number | undefined;
    if (thicknessOpt) {
      const thicknessEntry = Object.entries(OPTION_IDS.THICKNESS).find(
        ([, id]) => id === thicknessOpt
      );
      if (thicknessEntry) {
        thickness = parseInt(thicknessEntry[0].replace('MM', ''));
      }
    }

    if (surfaceArea > 0 && systemType) {
      const calculated = calculateMaterials({
        surfaceArea,
        systemType,
        insulationType,
        thickness,
        renderType,
        grainSize,
        fixingsType,
        surfaceMaterial,
        selectedOptions,
        values
      });
      setCalculatedMaterials(calculated);
      console.log('Calculated materials:', calculated);
    }
  }, [values, selectedOptions]);

  // Products are now hardcoded, no need to fetch

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
      const newSelected = [...filtered, optionId];
      
      // Clear values from steps that will become skipped due to this option change
      const stepsToSkip: number[] = [];
      stepsData.steps.forEach(s => {
        s.conditions?.forEach(cond => {
          if (cond.trigger_option === optionId) {
            stepsToSkip.push(...cond.skip_steps);
          }
        });
      });
      
      if (stepsToSkip.length > 0) {
        setValues(prevValues => {
          const newValues = { ...prevValues };
          
          // Clear values for skipped parent steps and their substeps
          stepsToSkip.forEach(skipStepId => {
            const skipStep = stepsData.steps.find(s => s.id === skipStepId);
            if (skipStep) {
              delete newValues[skipStepId];
              
              // Clear all substeps recursively
              const clearSubsteps = (step: any) => {
                if (step.substeps) {
                  step.substeps.forEach((sub: any) => {
                    delete newValues[sub.id];
                    clearSubsteps(sub);
                  });
                }
              };
              clearSubsteps(skipStep);
            }
          });
          
          return newValues;
        });
        
        // Also clear accumulated JSON data for skipped steps
        setAccumulatedJsonData(prev => {
          const newData = { ...prev };
          
          stepsToSkip.forEach(skipStepId => {
            const skipStep = stepsData.steps.find(s => s.id === skipStepId);
            if (skipStep?.json_key) {
              delete newData[skipStep.json_key];
            }
          });
          
          return newData;
        });
      }
      
      return newSelected;
    });

    // Clear cache and generated image when house type changes (step 1) or surface changes (step 2)
    if (stepId === 1 || stepId === 2) {
      generatedImageCache.clear();
      setGeneratedImage(null);
      setCompositeImage(null);
      // Also clear colour selection
      setValues(prev => {
        const newValues = { ...prev };
        delete newValues[11]; // Step 11 is colour
        return newValues;
      });
      // Clear colour option selection
      setSelectedOptions(prev => {
        const colourOptions = stepsData.steps.find(s => s.id === 11)?.options?.map(o => o.id) || [];
        return prev.filter(opt => !colourOptions.includes(opt));
      });
      // Clear colour from accumulated JSON
      setAccumulatedJsonData(prev => {
        const newData = { ...prev };
        const colourStep = stepsData.steps.find(s => s.id === 11);
        if (colourStep?.json_key) {
          delete newData[colourStep.json_key];
        }
        // Also clear colour_code if present
        delete newData["colour_code"];
        return newData;
      });
      console.log("House type or surface changed - cleared AI generated images cache and colour selection");
    }

    // When render type changes (step 9), check if switching between render types and brick slips
    if (stepId === 9) {
      const renderTypeOptions = [
        OPTION_IDS.RENDER_TYPE.NANO_DREX,
        OPTION_IDS.RENDER_TYPE.PREMIUM_BIO,
        OPTION_IDS.RENDER_TYPE.SILICONE,
        OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE
      ];
      const brickSlipsOption = OPTION_IDS.RENDER_TYPE.BRICK_SLIPS;
      
      // Find currently selected render type
      const currentRenderType = selectedOptions.find(opt => 
        renderTypeOptions.includes(opt) || opt === brickSlipsOption
      );
      
      // Check if switching between render types group and brick slips
      const wasRenderType = currentRenderType && renderTypeOptions.includes(currentRenderType);
      const wasBrickSlips = currentRenderType === brickSlipsOption;
      const isNowRenderType = renderTypeOptions.includes(optionId);
      const isNowBrickSlips = optionId === brickSlipsOption;
      
      const switchingBetweenGroups = (wasRenderType && isNowBrickSlips) || (wasBrickSlips && isNowRenderType);
      
      if (switchingBetweenGroups) {
        // Reset colour when switching between render types and brick slips
        generatedImageCache.clear();
        setGeneratedImage(null);
        setCompositeImage(null);
        setValues(prev => {
          const newValues = { ...prev };
          delete newValues[11];
          return newValues;
        });
        setSelectedOptions(prev => {
          const colourOptions = stepsData.steps.find(s => s.id === 11)?.options?.map(o => o.id) || [];
          return prev.filter(opt => !colourOptions.includes(opt));
        });
        setAccumulatedJsonData(prev => {
          const newData = { ...prev };
          const colourStep = stepsData.steps.find(s => s.id === 11);
          if (colourStep?.json_key) {
            delete newData[colourStep.json_key];
          }
          delete newData["colour_code"];
          return newData;
        });
        console.log("Switched between render types and brick slips - cleared colour selection");
      }
    }

    // When render type changes (step 9), check if current grain size is compatible
    if (stepId === 9) {
      const grainSizeStep = stepsData.steps.find(s => s.id === 10);
      const currentGrainSizeValue = values[10];
      
      if (grainSizeStep && currentGrainSizeValue !== undefined) {
        // Find the currently selected grain size option
        const currentGrainOption = grainSizeStep.options?.find(
          opt => opt.option_value === currentGrainSizeValue
        );
        
        // Check if this grain size is compatible with the new render type
        if (currentGrainOption?.parent_option_id) {
          const isCompatible = currentGrainOption.parent_option_id.includes(optionId);
          
          if (!isCompatible) {
            // Clear grain size selection if not compatible
            setValues(prev => {
              const newValues = { ...prev };
              delete newValues[10];
              return newValues;
            });
            // Clear grain size option from selectedOptions
            setSelectedOptions(prev => {
              const grainSizeOptions = grainSizeStep.options?.map(o => o.id) || [];
              return prev.filter(opt => !grainSizeOptions.includes(opt));
            });
            // Clear grain size from accumulated JSON
            setAccumulatedJsonData(prev => {
              const newData = { ...prev };
              if (grainSizeStep.json_key) {
                delete newData[grainSizeStep.json_key];
              }
              return newData;
            });
            console.log(`Grain size ${currentGrainSizeValue} not compatible with new render type - cleared`);
          } else {
            console.log(`Grain size ${currentGrainSizeValue} is compatible with new render type - kept`);
          }
        }
      }
    }

    // When insulation type changes (step 5), check if current thickness is compatible
    if (stepId === 5) {
      const thicknessStep = stepsData.steps.find(s => s.id === 6);
      const currentThicknessValue = values[6];
      
      if (thicknessStep && currentThicknessValue !== undefined) {
        // Find the currently selected thickness option
        const currentThicknessOption = thicknessStep.options?.find(
          opt => opt.option_value === currentThicknessValue
        );
        
        // Check if this thickness is compatible with the new insulation type
        if (currentThicknessOption?.parent_option_id) {
          const isCompatible = currentThicknessOption.parent_option_id.includes(optionId);
          
          if (!isCompatible) {
            // Clear thickness selection if not compatible
            setValues(prev => {
              const newValues = { ...prev };
              delete newValues[6];
              return newValues;
            });
            // Clear thickness option from selectedOptions
            setSelectedOptions(prev => {
              const thicknessOptions = thicknessStep.options?.map(o => o.id) || [];
              return prev.filter(opt => !thicknessOptions.includes(opt));
            });
            // Clear thickness from accumulated JSON
            setAccumulatedJsonData(prev => {
              const newData = { ...prev };
              if (thicknessStep.json_key) {
                delete newData[thicknessStep.json_key];
              }
              return newData;
            });
            console.log(`Thickness ${currentThicknessValue} not compatible with new insulation type - cleared`);
          } else {
            console.log(`Thickness ${currentThicknessValue} is compatible with new insulation type - kept`);
          }
        }
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
      
      // Clear the entire cache - all AI generated images from previous image
      generatedImageCache.clear();
      console.log("New custom image uploaded - cleared all AI generated images and cache");
      
      // Reset colour selection (step 11) when switching to custom image
      setValues(prev => {
        const newValues = { ...prev };
        delete newValues[11];
        return newValues;
      });
      
      // Clear colour option selection
      setSelectedOptions(prev => {
        const colourOptions = stepsData.steps.find(s => s.id === 11)?.options?.map(o => o.id) || [];
        return prev.filter(opt => !colourOptions.includes(opt));
      });
      
      // Clear colour from accumulated JSON
      setAccumulatedJsonData(prev => {
        const newData = { ...prev };
        const colourStep = stepsData.steps.find(s => s.id === 11);
        if (colourStep?.json_key) {
          delete newData[colourStep.json_key];
        }
        delete newData["colour_code"];
        return newData;
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
    
    // Clear cache when switching back to default image
    generatedImageCache.clear();
    console.log("Switched back to default image - cleared AI generated images cache");
    
    // Reset colour selection (step 11) when switching back to default image
    setValues(prev => {
      const newValues = { ...prev };
      delete newValues[11];
      return newValues;
    });
    
    // Clear colour option selection
    setSelectedOptions(prev => {
      const colourOptions = stepsData.steps.find(s => s.id === 11)?.options?.map(o => o.id) || [];
      return prev.filter(opt => !colourOptions.includes(opt));
    });
    
    // Clear colour from accumulated JSON
    setAccumulatedJsonData(prev => {
      const newData = { ...prev };
      const colourStep = stepsData.steps.find(s => s.id === 11);
      if (colourStep?.json_key) {
        delete newData[colourStep.json_key];
      }
      delete newData["colour_code"];
      return newData;
    });
  };

  const handleColourSelection = async (colourValue: string, optionId: number) => {
    console.log("Colour selected:", colourValue, "Option ID:", optionId);

    // Add colour option to selectedOptions for brick slips
    setSelectedOptions(prev => {
      const step11Options = stepsData.steps.find(s => s.id === 11)?.options?.map(o => o.id) || [];
      const filtered = prev.filter(opt => !step11Options.includes(opt));
      return [...filtered, optionId];
    });

    // If no custom image, show static preview from STEP_OPTION_IMAGES
    if (!customImage && !compositeImage) {
      
      return;
    }

    // Only use AI when user uploaded custom image
    console.log("Custom image detected - generating with AI");

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
      } else {
        // customImage is guaranteed to exist here because of early return above
        console.log("Using custom image without mask");
        baseImageUrl = customImage!; // Use non-null assertion since we checked above
        const response = await fetch(baseImageUrl);
        imageToSend = await response.blob();
      }

      // Compress image before sending to reduce payload size
      console.log(`Original image size: ${(imageToSend.size / 1024).toFixed(2)}KB`);
      imageToSend = await compressImage(imageToSend, 1920, 0.85);

      const formData = new FormData();
      // Custom image - send the user's image
      formData.append("file", imageToSend, "custom_house.jpg");
      
      console.log(`Sending custom_house.jpg (${(imageToSend.size / 1024).toFixed(2)}KB) to AI`);
      
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

      // Convert blob to base64 for submission
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setGeneratedImageBase64(base64String);
      };
      reader.readAsDataURL(resultBlob);

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

  // Log session - śledzenie postępu użytkownika (jak w starym kalkulatorze, linia ~1586)
  const logSession = async (lastStep: string) => {
    try {
      // Get apiKEY from URL or fallback to env
      const urlParams = new URLSearchParams(globalThis.location.search);
      const apiKEY = urlParams.get('apiKEY') || import.meta.env.VITE_API_KEY;
      
      const measurement = values[3] ? Number(values[3]) : 0;
      const url = "https://veen-e.ewipro.com:7443/ewi-calculator/log.php";
      
      // Build params for regular steps
      let params = apiKEY ? `?apiKEY=${apiKEY}` : "";
      if (measurement > 0) params += `&measurement=${measurement}`;
      params += "&justLogCalculation=1";
      if (logID !== 0) params += `&logID=${logID}&lastStep=${lastStep}`;
      
      console.log("📤 [logSession]", { lastStep, logID, measurement, url: url + params });
      
      const response = await fetch(url + params, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("📥 [logSession] Response:", data);
        
        if (data.logID) {
          setLogID(data.logID);
          console.log("✅ logID:", data.logID);
        }
      }
    } catch (error) {
      console.error("❌ [logSession]", error);
    }
  };

  const handleNext = (
    values?: Record<string, string | number | Record<string, any>>,
    triggerStepId?: number,
    selectedOptionId?: number
  ) => {
    // Accumulate JSON data from this step
    if (values) {
      setAccumulatedJsonData(prev => ({
        ...prev,
        ...values
      }));
    }
    
    // If on last step and clicking "Send", submit the form instead of navigating
    const lastStepIndex = parentSteps.length - 1;
    if (currentStep === lastStepIndex) {
      submitForm();
      return;
    }

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
    
    // Log session BEFORE moving to next step (log the step we just completed)
    const completedStepName = parentSteps[currentStep]?.json_key || `step-${currentStep}`;
    console.log("🟢 [handleNext] Completed step:", currentStep, completedStepName);
    logSession(completedStepName);
    
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    setCurrentStep(newStep);
  };

  const handlePrev = () => {
    let prevStep = currentStep - 1;

    // Find the previous non-skipped step
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

    const newPrevStep = Math.max(prevStep, 0);
    
    // Clear accumulated JSON data for steps after the new current step
    setAccumulatedJsonData(prev => {
      const newData = { ...prev };
      const stepsToRemove = parentSteps.slice(newPrevStep + 1);
      
      stepsToRemove.forEach(step => {
        if (step.json_key) {
          delete newData[step.json_key];
        }
      });
      
      return newData;
    });

    // Mark steps after the new current step as incomplete
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



  // Submit full form with customer details
const submitForm = async () => {
  console.log("🟢 [submitForm] START, logID:", logID);
  console.log("📦 [submitForm] Using accumulated JSON:", accumulatedJsonData);
  
  try {
    // Build complete data structure first
    let mappedData = { ...accumulatedJsonData };
    
    // ===========================
    // COLOUR - RENAME KEY
    // ===========================
    // Step 11 has json_key="colour" but API expects "colour_code"
    if (mappedData.colour !== undefined) {
      mappedData["colour_code"] = mappedData.colour;
      delete mappedData.colour;
    }
    
    // ===========================
    // BEADS & TRIMS - FLATTEN STRUCTURE
    // ===========================
    // beadsTrims może być zagnieżdżone { beadsTrims: { startbeads: {...}, cornerbeads: 5, ... } }
    // Musimy je spłaszczyć do poziomu głównego
    
    if (mappedData.beadsTrims && typeof mappedData.beadsTrims === 'object') {
      const beadsData = mappedData.beadsTrims as Record<string, any>;
      
      // Handle startbeads (keep nested structure with type and count)
      if (beadsData.startbeads && typeof beadsData.startbeads === 'object') {
        mappedData["startbeads"] = {
          type: beadsData.startbeads.type || null,
          count: beadsData.startbeads.count || ''
        };
      }
      
      // Handle other beads (rename keys)
      if (beadsData.cornerbeads !== undefined) {
        mappedData["corner-beads"] = beadsData.cornerbeads;
      }
      if (beadsData.stopbeads !== undefined) {
        mappedData["stop-beads"] = beadsData.stopbeads;
      }
      if (beadsData.bellcastbeads !== undefined) {
        mappedData["bellcast-beads"] = beadsData.bellcastbeads;
      }
      if (beadsData.revealbeads !== undefined) {
        mappedData["window-reveal"] = beadsData.revealbeads;
      }
      if (beadsData.windowbeads !== undefined) {
        mappedData["window-beads"] = beadsData.windowbeads;
      }
      
      // Remove the nested beadsTrims object
      delete mappedData.beadsTrims;
    }
    
    // ===========================
    // ADDITIONAL PRODUCTS - FLATTEN STRUCTURE
    // ===========================
    // additionalProducts może być { additionalProducts: { "levelling-coat": 5, ... } }
    // Spłaszczamy do głównego poziomu
    
    if (mappedData.additionalProducts && typeof mappedData.additionalProducts === 'object') {
      const additionalData = mappedData.additionalProducts as Record<string, any>;
      
      Object.keys(additionalData).forEach(key => {
        mappedData[key] = additionalData[key];
      });
      
      // Remove the nested additionalProducts object
      delete mappedData.additionalProducts;
    }

    // ===========================
    // FIXINGS MIN LENGTH - CALCULATE REQUIRED LENGTH
    // ===========================
    // Calculate minimum required fixing length based on insulation type and thickness
    if (mappedData.fixings !== undefined && mappedData.insulationType && mappedData.thickness) {
      const insulationType = mappedData.insulationType; // "EPS" | "Kingspan" | "Wool"
      const thickness = mappedData.thickness; // number (mm)
      
      // Get available lengths from step 7 fixings option
      const step7 = stepsData.steps.find(s => s.id === 7);
      const selectedFixingOption = step7?.options?.find(opt => 
        selectedOptions.includes(opt.id)
      );
      
      if (selectedFixingOption?.product?.avaliable_lenght) {
        const availableLengths = selectedFixingOption.product.avaliable_lenght;
        let requiredMinLength: number;
        
        if (insulationType === "EPS") {
          // For EPS: thickness + 20 + 45 = thickness + 65
          requiredMinLength = thickness + 65;
        } else {
          // For Kingspan and Wool: thickness + 45
          requiredMinLength = thickness + 45;
        }
        
        // Find the smallest available length that is >= required minimum
        const sortedLengths = [...availableLengths].sort((a, b) => a - b);
        const selectedLength = sortedLengths.find(length => length >= requiredMinLength);
        
        if (selectedLength) {
          mappedData.fixings_min_length = selectedLength;
        }
      }
    }

    // ===========================
    // CUSTOMER DETAILS
    // ===========================

    const customerDetailsStep = stepsData.steps.find(s => s.id === 13);
    const customer_details: Record<string, any> = {};

    if (customerDetailsStep?.substeps) {
      customerDetailsStep.substeps.forEach((substep: any) => {
        customer_details[substep.json_key] =
          values[substep.id] || null;
      });
    }

    // ===========================
    // CALCULATED MATERIALS
    // ===========================
    const materials = calculatedMaterials ? {
      insulation_material_units: calculatedMaterials.insulation_material_units,
      adhesive_units: calculatedMaterials.adhesive_units,
      mesh_units: calculatedMaterials.mesh_units,
      fixings_units: calculatedMaterials.fixings_units,
      primer_310_units: calculatedMaterials.primer_310_units,
      primer_20_units: calculatedMaterials.primer_20_units,
      primer_7_units: calculatedMaterials.primer_7_units,
      render_units: calculatedMaterials.render_units,
      ...(calculatedMaterials.brick_slips_units && { brick_slips_units: calculatedMaterials.brick_slips_units }),
      ...(calculatedMaterials.brick_slips_adhesive_units && { brick_slips_adhesive_units: calculatedMaterials.brick_slips_adhesive_units }),
      ...(calculatedMaterials.corner_beads && { corner_beads: calculatedMaterials.corner_beads }),
      ...(calculatedMaterials.stop_beads && { stop_beads: calculatedMaterials.stop_beads }),
      ...(calculatedMaterials.bellcast_beads && { bellcast_beads: calculatedMaterials.bellcast_beads }),
      ...(calculatedMaterials.window_reveal && { window_reveal: calculatedMaterials.window_reveal }),
      ...(calculatedMaterials.starter_tracks && { starter_tracks: calculatedMaterials.starter_tracks }),
      ...(calculatedMaterials.corner_brick_slips && { corner_brick_slips: calculatedMaterials.corner_brick_slips }),
      ...(calculatedMaterials.levelling_coat && { levelling_coat: calculatedMaterials.levelling_coat }),
      ...(calculatedMaterials.fungicidal_wash && { fungicidal_wash: calculatedMaterials.fungicidal_wash }),
      ...(calculatedMaterials.blue_film && { blue_film: calculatedMaterials.blue_film }),
      ...(calculatedMaterials.orange_tape && { orange_tape: calculatedMaterials.orange_tape })
    } : {};

    // ===========================
    // CLEAN UP - REMOVE UNDEFINED/NULL/EMPTY VALUES
    // ===========================
    // Recursively remove undefined, null, and empty string values (but keep 0)
    const cleanObject = (obj: any): any => {
      if (obj === null || obj === undefined) return obj;
      
      if (Array.isArray(obj)) {
        return obj.map(item => cleanObject(item));
      }
      
      if (typeof obj === 'object') {
        const cleaned: Record<string, any> = {};
        Object.keys(obj).forEach(key => {
          const value = obj[key];
          // Keep value if it's not undefined, null, or empty string
          // 0 and false are kept
          if (value !== undefined && value !== null && value !== '') {
            cleaned[key] = cleanObject(value);
          }
        });
        return cleaned;
      }
      
      return obj;
    };

    // Clean all three parts separately
    const cleanedMappedData = cleanObject(mappedData);
    const cleanedCustomerDetails = cleanObject(customer_details);
    const cleanedMaterials = cleanObject(materials);

    // ===========================
    // FINAL PAYLOAD (jak w legacy)
    // ===========================

    const urlParams = new URLSearchParams(globalThis.location.search);
    const apiKEY = urlParams.get('apiKEY') || import.meta.env.VITE_API_KEY;

    const payload = {
      apiKEY: apiKEY,
      sessionNumber: sessionNumber,
      logID: logID,
      data: {
        ...cleanedMappedData,
        customer_details: cleanedCustomerDetails,
        materials: cleanedMaterials,
        ...(generatedImageBase64 && { photo: generatedImageBase64 })
      }
    };

    console.log("📤 [submitForm] Wysyłam do backendu:");
    console.log("   apiKEY:", apiKEY);
    console.log("   sessionNumber:", sessionNumber || Date.now());
    console.log("   logID:", logID);
    console.log("   data.mappedData:", cleanedMappedData);
    console.log("   data.customer_details:", cleanedCustomerDetails);
    console.log("   data.materials:", cleanedMaterials);
    console.log("   data.photo:", generatedImageBase64 ? "✅ Included (base64)" : "❌ Not included");
    console.log("   Full payload (without photo):", JSON.stringify({...payload, data: {...payload.data, photo: generatedImageBase64 ? "[BASE64_DATA]" : undefined}}, null, 2));

    // ===========================
    // FINAL POST REQUEST
    // ===========================
    
    const response = await fetch(
      "https://veen-e.ewipro.com:7443/ewi-calculator/log.php",
      {
        method: "POST",
        body: JSON.stringify(payload)
      }
    );

    console.log("📥 [submitForm] POST Response:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    let result;
    try {
      result = await response.json();
      console.log("📥 [submitForm] POST Result:", result);
    } catch {
      throw new Error("Invalid JSON from server");
    }

    // Walidacja i redirect
    if (result.email_validation === 1) {
      alert("Formularz wysłany poprawnie ✅");

      if (result.quote_id) {
        const offerLink = `https://offer.ewistore.co.uk/${result.quote_id}/AE`;
        console.log("🟢 Redirect:", offerLink);
        globalThis.location.href = offerLink;
      }
    } else {
      alert("Błąd walidacji danych. Sprawdź formularz.");
      console.warn("Validation error:", result);
    }

  } catch (error: any) {
    console.error("❌ [submitForm]", error);

    if (error.message.includes("HTTP")) {
      alert("Błąd serwera. Spróbuj ponownie później.");
    } else if (error.message.includes("JSON")) {
      alert("Niepoprawna odpowiedź z serwera.");
    } else {
      alert("Brak połączenia z serwerem.");
    }

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

  // Show loading state while checking authorization
  if (isAuthorizing) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center'
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Checking authorization...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please wait
          </Typography>
        </Box>
      </Box>
    );
  }

  // Show error message if not authorized
  if (!isAuthorized || authError) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          px: 2
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ mb: 2, color: 'error.main', fontWeight: 600 }}>
            Access Denied
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {authError || "You're not authorized to use the EWI Materials Calculator."}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please contact your administrator for access.
          </Typography>
        </Box>
      </Box>
    );
  }

  // Loading state while checking authorization
  if (isAuthorizing) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">Loading...</Typography>
      </Box>
    );
  }

  // Unauthorized state - show error message
  if (!isAuthorized) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'error.main',
            fontWeight: 600,
            mb: 2
          }}
        >
          {authError}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please refresh the page.
        </Typography>
      </Box>
    );
  }

  // Authorized - render calculator
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
                al1ignItems: 'center',
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
                  // Priority 1: Focused substep image (when user is typing in a number input with image)
                  if (focusedSubstepImage) return focusedSubstepImage;
                  
                  // Priority 2: Selected option image
                  const stepValue = values[parentStep.id];
                  // Najpierw statyczne
                  const staticOpt = parentStep.options?.find?.(o => o.option_value === stepValue || o.json_value === stepValue);
                  if (staticOpt?.image) return staticOpt.image;
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
                calculatedMaterials={calculatedMaterials}
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