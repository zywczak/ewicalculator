import React, { useEffect, useState, useRef } from "react";
import { Box, IconButton, Tooltip, CircularProgress, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { getHouseTypeFromOptions } from "../data/images/utils";
import { HouseOutline, CustomHouseImage } from "../data/images/types";
import { imageGenerationService } from "../services/imageGenerationService";
import { geminiImageAPI } from "../services/geminiImageAPI";
import { StepsData } from "../data/steps/types";
import OPTION_IDS from "../data/constants/optionIds";
import { outlineImageService } from "../services/outlineImageService";

interface HousePreviewProps {
  selectedOptions: number[];
  isMobile?: boolean;
  onHouseImageChange?: (imageData: CustomHouseImage | null) => void;
  onCustomImageSelected?: () => void;
  currentStep?: number;
  stepsData?: StepsData;
  onGeneratingChange?: (isGenerating: boolean) => void;
}

const HousePreview: React.FC<HousePreviewProps> = ({
  selectedOptions,
  isMobile = false,
  onHouseImageChange,
  onCustomImageSelected,
  currentStep = 0,
  stepsData,
  onGeneratingChange,
}) => {
  const [customImage, setCustomImage] = useState<CustomHouseImage | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false);
  const [outline, setOutline] = useState<HouseOutline>({ points: [], isComplete: false });
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [, setSnackbarOpen] = useState<boolean>(false);
  const [, setSavedOutlineImage] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastGeneratedRef = useRef<string>('');
  const prevStepRef = useRef<number>(currentStep);

  // Notify parent about generating state changes
  useEffect(() => {
    if (onGeneratingChange) {
      onGeneratingChange(isGenerating);
    }
  }, [isGenerating, onGeneratingChange]);

  // Update drawing mode when house type changes
  useEffect(() => {
    if (!customImage) return;
    
    const houseTypeId = getHouseTypeFromOptions(selectedOptions);
    const shouldEnableDrawing = houseTypeId === OPTION_IDS.HOUSE.TERRACED || 
                               houseTypeId === OPTION_IDS.HOUSE.SEMI_DETACHED;
    
    setIsDrawingMode(shouldEnableDrawing);
    
    // Clear outline when switching to DETACHED
    if (!shouldEnableDrawing) {
      setOutline({ points: [], isComplete: false });
    }
  }, [selectedOptions, customImage]);

  // Handle step changes - load appropriate image when going back
  useEffect(() => {
    const handleStepChange = async () => {
      if (!stepsData) return;

      // Check if we're going back OR we don't have an image (coming from results)
      const isGoingBack = currentStep < prevStepRef.current;
      const needsImageRestore = !customImage && currentStep > 0;

      if (isGoingBack || needsImageRestore) {
        console.log('Restoring image for step', currentStep + 1, '- goingBack:', isGoingBack, 'needsRestore:', needsImageRestore);
        
        // If we don't have customImage yet (coming back from results table), restore base image first
        let workingImage = customImage;
        
        if (!workingImage) {
          const baseImageUrl = outlineImageService.getBaseImage();
          if (baseImageUrl) {
            console.log('Restoring base image from storage');
            const savedOutline = outlineImageService.getOutlineImage();
            workingImage = {
              imageUrl: baseImageUrl,
              outline: savedOutline ? { points: [], isComplete: true } : null
            };
            setCustomImage(workingImage);
          }
        }
        
        // Now find the right image to display
        if (workingImage) {
          // Find which option was selected for current step
          const currentStepData = stepsData.steps.find(s => s.id === currentStep + 1);
          let currentStepOption: number | undefined;
          
          if (currentStepData?.options) {
            const optionIds = currentStepData.options.map(opt => opt.id);
            currentStepOption = selectedOptions.find(opt => optionIds.includes(opt));
          }
          
          // If current step has AI generation and we have a cached image for it, show it
          if (currentStepData?.generateImageWithAI && currentStepOption) {
            const currentCachedImage = imageGenerationService.getGeneratedImage(currentStep + 1, currentStepOption);
            if (currentCachedImage) {
              console.log('Loading current step cached image:', currentStep + 1, 'option:', currentStepOption);
              const restoredImage = {
                imageUrl: currentCachedImage.imageUrl,
                outline: workingImage.outline
              };
              setCustomImage(restoredImage);
              if (onHouseImageChange) {
                onHouseImageChange(restoredImage);
              }
              lastGeneratedRef.current = '';
              prevStepRef.current = currentStep;
              return;
            }
          }
          
          // If current step doesn't have generated image, find the last AI-generated step BEFORE current step
          let lastAIStep = null;
          let lastAIOption = null;
          
          for (let i = currentStep - 1; i >= 0; i--) {
            const stepData = stepsData.steps.find(s => s.id === i + 1);
            if (stepData?.generateImageWithAI) {
              // Find option for this step
              if (stepData.options) {
                const stepOptionIds = stepData.options.map(opt => opt.id);
                const stepOption = selectedOptions.find(opt => stepOptionIds.includes(opt));
                
                if (stepOption) {
                  const cachedImage = imageGenerationService.getGeneratedImage(i + 1, stepOption);
                  if (cachedImage) {
                    lastAIStep = i + 1;
                    lastAIOption = stepOption;
                    console.log('Found previous cached image for step', lastAIStep, 'option', lastAIOption);
                    break;
                  }
                }
              }
            }
          }
          
          if (lastAIStep && lastAIOption) {
            // Load the cached image for that previous step
            const cachedImage = imageGenerationService.getGeneratedImage(lastAIStep, lastAIOption);
            if (cachedImage) {
              console.log('Loading previous AI step image from step', lastAIStep);
              const restoredImage = {
                imageUrl: cachedImage.imageUrl,
                outline: workingImage.outline
              };
              setCustomImage(restoredImage);
              if (onHouseImageChange) {
                onHouseImageChange(restoredImage);
              }
            }
          } else {
            // No AI steps found, keep base image
            console.log('No AI steps found - keeping base image');
            if (onHouseImageChange) {
              onHouseImageChange(workingImage);
            }
          }
        }
        
        // Reset generation flag
        lastGeneratedRef.current = '';
      }
      
      prevStepRef.current = currentStep;
    };

    handleStepChange();
  }, [currentStep, stepsData, selectedOptions, customImage]);

  // Check for generated image or generate new one
  useEffect(() => {
    const generateIfNeeded = async () => {
      if (!stepsData || currentStep === 0 || !customImage) {
        console.log('Skipping generation:', { stepsData: !!stepsData, currentStep, customImage: !!customImage });
        return;
      }
      
      const currentStepData = stepsData.steps.find(s => s.id === currentStep + 1);
      if (!currentStepData?.generateImageWithAI) {
        console.log('Step does not require AI generation');
        return;
      }

      console.log('Selected options array:', selectedOptions);
      console.log('Current step:', currentStep);
      console.log('Current step ID:', currentStep + 1);
      
      // Find which option belongs to current step by checking if it's in current step's options
      let currentStepOption: number | undefined;
      
      if (currentStepData.options) {
        const optionIds = currentStepData.options.map(opt => opt.id);
        console.log('Valid option IDs for this step:', optionIds);
        
        // Find first selected option that matches this step's valid options
        currentStepOption = selectedOptions.find(opt => optionIds.includes(opt));
        console.log('Found option for current step:', currentStepOption);
      }
      
      if (!currentStepOption) {
        console.log('No option selected for current step yet - waiting for user selection');
        return;
      }

      const cacheKey = `${currentStep + 1}-${currentStepOption}`;
      
      // Prevent duplicate generation
      if (lastGeneratedRef.current === cacheKey) {
        console.log('Already generating/generated for this step/option:', cacheKey);
        return;
      }

      // Check if image already exists in cache
      const existingImage = imageGenerationService.getGeneratedImage(currentStep + 1, currentStepOption);
      if (existingImage) {
        console.log('Loading cached image for:', cacheKey);
        console.log('Cached image URL:', existingImage.imageUrl.substring(0, 50) + '...');
        
        const newCustomImage = {
          imageUrl: existingImage.imageUrl,
          outline: customImage.outline
        };
        
        setCustomImage(newCustomImage);
        
        if (onHouseImageChange) {
          onHouseImageChange(newCustomImage);
        }
        
        lastGeneratedRef.current = cacheKey;
        return;
      }

      // Generate new image only after user selected an option
      console.log('User selected option', currentStepOption, 'for step', currentStep + 1, '- starting generation');
      lastGeneratedRef.current = cacheKey;
      await generateImageForCurrentStep(currentStep + 1, currentStepOption, currentStepData);
    };

    generateIfNeeded();
  }, [selectedOptions, currentStep, stepsData]);

  const generateImageForCurrentStep = async (stepId: number, optionId: number, stepData: any) => {
    if (!customImage) {
      console.log('No custom image available');
      return;
    }
    
    setIsGenerating(true);
    console.log('Generating image for step:', stepId, 'option:', optionId);
    
    try {
      const option = stepData.options?.find((opt: any) => opt.id === optionId);
      
      // Determine which image to use as base
      const houseTypeId = getHouseTypeFromOptions(selectedOptions);
      const isDetached = houseTypeId === OPTION_IDS.HOUSE.DETACHED;
      
      let baseImageUrl: string;
      let outlineImageUrl = '';
      let productImageUrl = '';
      
      if (isDetached) {
        const uploadedBaseImage = outlineImageService.getBaseImage();
        if (uploadedBaseImage) {
          console.log('Using uploaded image without outline for DETACHED');
          baseImageUrl = uploadedBaseImage;
        } else {
          console.log('Using current image for DETACHED');
          baseImageUrl = customImage.imageUrl;
        }
      } else {
        outlineImageUrl = outlineImageService.getOutlineImage() || '';
        baseImageUrl = outlineImageService.getBaseImage() || customImage.imageUrl;
        console.log('Using custom image with outline');
      }

      // Pobierz zdjęcie produktu z option_image
      if (option?.option_image) {
        productImageUrl = option.option_image;
        console.log('Using product image:', productImageUrl);
      }
      
      console.log('Using base image:', baseImageUrl.substring(0, 50) + '...');
      console.log('Using outline image:', outlineImageUrl ? 'Yes' : 'No');
      console.log('Using product image:', productImageUrl ? 'Yes' : 'No');
      
      let prompt = stepData.aiImagePrompt?.replace('{option_value}', option?.option_value || '');
      
      // Usuń dodawanie losowego koloru w kroku 2
      console.log('Prompt:', prompt);

      const response = await geminiImageAPI.generateImage({
        baseImageUrl: baseImageUrl,
        outlineImageUrl: outlineImageUrl,
        selectedOptions,
        stepId,
        optionId,
        prompt: prompt || 'Modify the house image based on the selected option',
        productImageUrl: productImageUrl || undefined
      });

      console.log('Generation response:', response);

      if (response.success && response.imageUrl) {
        console.log('Successfully generated image');
        
        imageGenerationService.saveGeneratedImage({
          stepId,
          optionId,
          imageUrl: response.imageUrl,
          timestamp: Date.now()
        });
        console.log('Saving generated image to cache');
        
        const newCustomImage = {
          imageUrl: response.imageUrl,
          outline: customImage.outline
        };
        
        console.log('Updating customImage state');
        setCustomImage(newCustomImage);
        
        if (onHouseImageChange) {
          console.log('Notifying parent about image change');
          onHouseImageChange(newCustomImage);
        }
        
        console.log('Image generation complete');
      } else {
        console.error('Generation failed:', response);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const houseTypeId = getHouseTypeFromOptions(selectedOptions);
        
        // Save base image
        outlineImageService.saveBaseImage(imageUrl);
        
        // Enable drawing mode only for TERRACED and SEMI_DETACHED
        const shouldEnableDrawing = houseTypeId === OPTION_IDS.HOUSE.TERRACED || 
                                   houseTypeId === OPTION_IDS.HOUSE.SEMI_DETACHED;
        
        const newCustomImage = {
          imageUrl,
          outline: null
        };
        
        setCustomImage(newCustomImage);
        setIsDrawingMode(shouldEnableDrawing);
        setOutline({ points: [], isComplete: false });
        
        // Clear previous generations when new image is uploaded
        imageGenerationService.clearGeneratedImages();
        lastGeneratedRef.current = '';
        
        // Notify parent that custom image was selected
        if (onCustomImageSelected) {
          onCustomImageSelected();
        }
        
        // For DETACHED, immediately notify parent about image (no drawing required)
        if (!shouldEnableDrawing && onHouseImageChange) {
          onHouseImageChange(newCustomImage);
        }
      };
      reader.readAsDataURL(file);
    }
    
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleChangeHouse = () => {
    setCustomImage(null);
    setOutline({ points: [], isComplete: false });
    setIsDrawingMode(false);
    outlineImageService.clearAll();
    if (onHouseImageChange) {
      onHouseImageChange(null);
    }
  };

  const handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setIsDrawing(true);
    setOutline({
      points: [{ x, y }],
      isComplete: false
    });
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !canvasRef.current || !isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setOutline(prev => ({
      ...prev,
      points: [...prev.points, { x, y }]
    }));
  };

  const handleCanvasMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  const generateOutlineImage = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!canvasRef.current || !imageRef.current) {
        reject('Canvas or image not available');
        return;
      }

      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) {
        reject('Could not get canvas context');
        return;
      }

      const img = imageRef.current;
      tempCanvas.width = img.naturalWidth || 600;
      tempCanvas.height = img.naturalHeight || 450;

      // Draw the image
      tempCtx.drawImage(img, 0, 0);

      // Draw the outline
      if (outline.points.length > 0) {
        tempCtx.strokeStyle = '#ff0000';
        tempCtx.lineWidth = 5;
        tempCtx.lineCap = 'round';
        tempCtx.lineJoin = 'round';
        tempCtx.beginPath();
        
        outline.points.forEach((point, index) => {
          const x = point.x * tempCanvas.width;
          const y = point.y * tempCanvas.height;
          
          if (index === 0) {
            tempCtx.moveTo(x, y);
          } else {
            tempCtx.lineTo(x, y);
          }
        });

        if (outline.isComplete && outline.points.length > 0) {
          const firstPoint = outline.points[0];
          tempCtx.lineTo(firstPoint.x * tempCanvas.width, firstPoint.y * tempCanvas.height);
          tempCtx.fillStyle = 'rgba(255, 0, 0, 0.2)';
          tempCtx.fill();
        }
        
        tempCtx.stroke();
      }

      const imageUrl = tempCanvas.toDataURL('image/png');
      resolve(imageUrl);
    });
  };

  const completeOutline = async () => {
    if (outline.points.length >= 10) {
      const completedOutline = { ...outline, isComplete: true };
      setOutline(completedOutline);
      setIsDrawingMode(false);
      
      if (customImage) {
        const updatedCustomImage = {
          ...customImage,
          outline: completedOutline
        };
        setCustomImage(updatedCustomImage);
        if (onHouseImageChange) {
          onHouseImageChange(updatedCustomImage);
        }

        // Generate and save outline image
        try {
          const outlineImageUrl = await generateOutlineImage();
          outlineImageService.saveOutlineImage(outlineImageUrl);
          setSavedOutlineImage(outlineImageUrl);
          setSnackbarOpen(true);
        } catch (error) {
          console.error('Error generating outline image:', error);
        }
      }
    }
  };

  // Expose completeOutline to parent
  useEffect(() => {
    const houseTypeId = getHouseTypeFromOptions(selectedOptions);
    const needsOutline = customImage && (
      houseTypeId === OPTION_IDS.HOUSE.TERRACED || 
      houseTypeId === OPTION_IDS.HOUSE.SEMI_DETACHED
    );
    
    console.log('Exposing handlers - isDrawingMode:', isDrawingMode, 'outline points:', outline.points.length, 'outline complete:', outline.isComplete, 'needsOutline:', needsOutline);
    
    (window as any).__housePreviewHandlers = {
      completeOutline,
      canComplete: isDrawingMode && !outline.isComplete && outline.points.length >= 10,
      isDrawingMode,
      outlineCompleted: outline.isComplete,
      needsOutline: needsOutline
    };
  }, [outline, customImage, isDrawingMode, selectedOptions]);

  useEffect(() => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (outline.points.length > 0) {
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      
      outline.points.forEach((point, index) => {
        const x = point.x * canvas.width;
        const y = point.y * canvas.height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      if (outline.isComplete && outline.points.length > 0) {
        const firstPoint = outline.points[0];
        ctx.lineTo(firstPoint.x * canvas.width, firstPoint.y * canvas.height);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
        ctx.fill();
      }
      
      ctx.stroke();
    }
  }, [outline]);


  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderRadius: "20px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        width: isMobile ? "100%" : "600px",
        height: isMobile ? "auto" : "450px",
        aspectRatio: isMobile ? "4/3" : undefined,
      }}
    >
      {/* Loading indicator */}
      {isGenerating && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 150,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: 3,
            borderRadius: "20px",
          }}
        >
          <CircularProgress sx={{ color: 'white' }} />
          <Box sx={{ color: 'white', textAlign: 'center' }}>
            Modyfikacja elewacji za pomocą AI...
            <Typography variant="caption" display="block" sx={{ mt: 1, opacity: 0.8 }}>
              Używam image-to-image z Stable Diffusion
            </Typography>
            <Typography variant="caption" display="block" sx={{ opacity: 0.6 }}>
              To może potrwać 20-40 sekund
            </Typography>
          </Box>
        </Box>
      )}

      {/* Przycisk usunięcia własnego zdjęcia */}
      {customImage && currentStep === 0 && (
        <Tooltip title="Usuń własne zdjęcie">
          <IconButton
            onClick={handleChangeHouse}
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 100,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />

      {/* Image or Placeholder */}
      {customImage ? (
        <>
          <Box
            ref={imageRef}
            component="img"
            key={customImage.imageUrl}
            src={customImage.imageUrl}
            alt="house preview"
            onLoad={() => console.log('Image loaded:', customImage.imageUrl.substring(0, 50) + '...')}
            onError={(e) => console.error('Image failed to load:', e)}
            sx={{
              width: "100%",
              height: "100%",
              margin: 0,
              borderRadius: "20px",
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 0,
            }}
          />
          
          {/* Canvas for drawing outline */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              cursor: isDrawingMode ? 'crosshair' : 'default',
              pointerEvents: isDrawingMode ? 'auto' : 'none',
              zIndex: 50,
            }}
            width={600}
            height={450}
          />
        </>
      ) : (
        <Box
          onClick={() => currentStep === 0 && fileInputRef.current?.click()}
          sx={{
            width: "100%",
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            cursor: currentStep === 0 ? 'pointer' : 'default',
            border: '2px dashed #ccc',
            borderRadius: "20px",
            '&:hover': currentStep === 0 ? {
              backgroundColor: '#e0e0e0',
              borderColor: '#999',
            } : {},
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: 80, color: '#999', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
            Add photo of your house
          </Typography>
          <Typography variant="body2" sx={{ color: '#999' }}>
            Click to select a photo
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default HousePreview;