import React, { useEffect, useState, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import defaultImage from "../assets/default.png";
import { findBestMatchingImage } from "../data/images/utils";
import address from "../api/adress";

interface Point {
  x: number;
  y: number;
}

interface HousePreviewProps {
  selectedOptions: number[];
  isMobile?: boolean;
  customImage?: string | null;
  isDrawingMode?: boolean;
  onOutlineChange?: (points: Point[], canComplete: boolean) => void;
  generatedImage?: string | null;
  isGeneratingImage?: boolean;
  currentStep?: number;
  onResetToDefault?: () => void;
}

const HousePreview: React.FC<HousePreviewProps> = ({
  selectedOptions,
  isMobile = false,
  customImage = null,
  isDrawingMode = false,
  onOutlineChange,
  generatedImage = null,
  isGeneratingImage = false,
  currentStep = 0,
  onResetToDefault
}) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [outlinePoints, setOutlinePoints] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    console.log("HousePreview useEffect:", { currentStep, customImage, generatedImage, selectedOptions });
    // Before step 11 (index 10): only show predefined images
    // From step 11 onwards (index 10+): priority: generated image > custom image > predefined image
    if (currentStep >= 10) {
      if (generatedImage) {
        console.log("Setting generatedImage:", generatedImage);
        setCurrentImage(generatedImage);
        setOutlinePoints([]); // Clear old outline when new image loads
      } else if (customImage) {
        console.log("Setting customImage:", customImage);
        setCurrentImage(customImage);
        setOutlinePoints([]); // Clear old outline when new image loads
      } else {
        // Find predefined image
        const imageUrl = findBestMatchingImage(selectedOptions);
        console.log("Selected Options:", selectedOptions);
        console.log("Found Image:", imageUrl);
        if (imageUrl) {
          setCurrentImage(address + imageUrl);
        } else {
          setCurrentImage(null);
        }
      }
    } else {
      // Before step 11: always show predefined image
      const imageUrl = findBestMatchingImage(selectedOptions);
      console.log("Selected Options:", selectedOptions);
      console.log("Found Image:", imageUrl);
      if (imageUrl) {
        setCurrentImage(address + imageUrl);
      } else {
        setCurrentImage(null);
      }
    }
  }, [selectedOptions, customImage, generatedImage, currentStep]);

  // Drawing logic for outline
  useEffect(() => {
    if (!isDrawingMode || !canvasRef.current || !imageRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match image displayed size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw outline
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (outlinePoints.length > 0) {
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      
      outlinePoints.forEach((point, index) => {
        const x = point.x * canvas.width;
        const y = point.y * canvas.height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Fill if enough points
      if (outlinePoints.length >= 10) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
        ctx.fill();
      }
    }
  }, [outlinePoints, isDrawingMode]);

  const handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setIsDrawing(true);
    setOutlinePoints([{ x, y }]);
    
    if (onOutlineChange) {
      onOutlineChange([{ x, y }], false);
    }
  };

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingMode || !canvasRef.current || !isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const newPoints = [...outlinePoints, { x, y }];
    setOutlinePoints(newPoints);
    
    if (onOutlineChange) {
      onOutlineChange(newPoints, newPoints.length >= 10);
    }
  };

  const handleCanvasMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

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
      {currentImage ? (
        <>
          {/* Przycisk X do usuwania custom/generated obrazu - tylko w kroku wyboru koloru */}
          {(customImage || generatedImage) && onResetToDefault && currentStep === 10 && (
            <IconButton
              onClick={onResetToDefault}
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                color: "#333",
                zIndex: 100,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  color: "#d32f2f",
                },
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
          <Box
            ref={imageRef}
            component="img"
            src={currentImage || ""}
            alt="house preview"
            sx={{
              width: "100%",
              height: "100%",
              margin: 0,
              borderRadius: isMobile ? 2 : 3,
              objectFit: currentStep >= 10 && (customImage || generatedImage) ? "cover" : "contain",
              transition: "opacity 0.4s ease-in-out",
              filter: isGeneratingImage ? "blur(8px)" : "none",
            }}
          />
          {isGeneratingImage && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent 0%, rgba(33, 150, 243, 0.3) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "scan 2s linear infinite",
                  pointerEvents: "none",
                  "@keyframes scan": {
                    "0%": { backgroundPosition: "200% 0" },
                    "100%": { backgroundPosition: "-200% 0" }
                  }
                }}
              />
          )}
          {isDrawingMode && currentStep === 10 && (
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
                cursor: 'crosshair',
                pointerEvents: 'auto',
                zIndex: 50,
              }}
            />
          )}          
        </>
      ) : (
        <Box
          component="img"
          src={defaultImage}
          alt="default"
          sx={{
            width: "100%",
            height: "100%",
            margin: 0,
            borderRadius: isMobile ? 2 : 3,
            objectFit: "contain",
          }}
        />
      )}
    </Box>
  );
};

export default HousePreview;
