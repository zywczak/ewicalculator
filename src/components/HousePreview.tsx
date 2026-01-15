import React, { useEffect, useState, useRef } from "react";
import { Box, Button, IconButton, Tooltip, CircularProgress, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { getHouseTypeFromOptions } from "../data/images/utils";
import { HouseOutline, CustomHouseImage } from "../data/images/types";
import { imageGenerationService } from "../services/imageGenerationService";
import { geminiImageAPI } from "../services/geminiImageAPI";
import { StepsData } from "../data/steps/types";
import OPTION_IDS from "../data/constants/optionIds";

interface HousePreviewProps {
  selectedOptions: number[];
  isMobile?: boolean;
  onHouseImageChange?: (imageData: CustomHouseImage | null) => void;
  onCustomImageSelected?: () => void;
  currentStep?: number;
  stepsData?: StepsData;
}

const HousePreview: React.FC<HousePreviewProps> = ({
  selectedOptions,
  isMobile = false,
  onHouseImageChange,
  onCustomImageSelected,
  currentStep = 0,
  stepsData
}) => {
  const [customImage, setCustomImage] = useState<CustomHouseImage | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false);
  const [outline, setOutline] = useState<HouseOutline>({ points: [], isComplete: false });
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Check for generated image or generate new one
  useEffect(() => {
    if (!stepsData || currentStep === 0 || !customImage) return;
    
    const currentStepData = stepsData.steps.find(s => s.id === currentStep + 1);
    if (!currentStepData?.generateImageWithAI) return;

    const lastSelectedOption = selectedOptions.at(-1);
    if (!lastSelectedOption) return;

    // Check if image already exists
    const existingImage = imageGenerationService.getGeneratedImage(currentStep + 1, lastSelectedOption);
    if (existingImage) {
      setCustomImage({
        imageUrl: existingImage.imageUrl,
        outline: customImage.outline
      });
      return;
    }

    // Generate new image
    generateImageForCurrentStep(currentStep + 1, lastSelectedOption, currentStepData);
  }, [selectedOptions, currentStep, stepsData, customImage]);

  const generateImageForCurrentStep = async (stepId: number, optionId: number, stepData: any) => {
    if (!customImage) return;
    
    setIsGenerating(true);
    
    try {
      const option = stepData.options?.find((opt: any) => opt.id === optionId);
      const prompt = stepData.aiImagePrompt?.replace('{option_value}', option?.option_value || '');

      const response = await geminiImageAPI.generateImage({
        baseImageUrl: customImage.imageUrl,
        outlineImageUrl: customImage.outline ? '' : '', // Can be used if outline is needed
        selectedOptions,
        stepId,
        optionId,
        prompt: prompt || 'Modify the house image based on the selected option'
      });

      if (response.success && response.imageUrl) {
        imageGenerationService.saveGeneratedImage({
          stepId,
          optionId,
          imageUrl: response.imageUrl,
          timestamp: Date.now()
        });
        
        setCustomImage({
          imageUrl: response.imageUrl,
          outline: customImage.outline
        });
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

  const completeOutline = () => {
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
      }
    }
  };

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
            borderRadius: 2,
          }}
        >
          <CircularProgress sx={{ color: 'white' }} />
          <Box sx={{ color: 'white', textAlign: 'center' }}>
            Generowanie zdjęcia AI...
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

      {/* Drawing controls */}
      {isDrawingMode && customImage && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              onClick={completeOutline}
              disabled={outline.points.length < 10}
              size={isMobile ? "small" : "medium"}
            >
              Zatwierdź
            </Button>
          </Box>
        </Box>
      )}

      {/* Image or Placeholder */}
      {customImage ? (
        <>
          <Box
            ref={imageRef}
            component="img"
            src={customImage.imageUrl}
            alt="house preview"
            sx={{
              width: "100%",
              height: "100%",
              margin: 0,
              borderRadius: isMobile ? 2 : 3,
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
            borderRadius: isMobile ? 2 : 3,
            '&:hover': currentStep === 0 ? {
              backgroundColor: '#e0e0e0',
              borderColor: '#999',
            } : {},
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: 80, color: '#999', mb: 2 }} />
          <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
            Dodaj zdjęcie własnego domu
          </Typography>
          <Typography variant="body2" sx={{ color: '#999' }}>
            Kliknij aby wybrać zdjęcie
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default HousePreview;