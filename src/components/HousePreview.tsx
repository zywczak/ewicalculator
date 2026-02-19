import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import defaultImage from "../assets/default.png";
import { findBestMatchingImage } from "../data/images/utils";
import address from "../api/adress";

interface Point { x: number; y: number; }

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
  compositeImage?: string | null;
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
  onResetToDefault,
  compositeImage = null,
}) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Image resolution ────────────────────────────────────────────────────
  useEffect(() => {
    if (currentStep >= 10) {
      if (generatedImage) setCurrentImage(generatedImage);
      else if (compositeImage) setCurrentImage(compositeImage);
      else if (customImage) setCurrentImage(customImage);
      else {
        const url = findBestMatchingImage(selectedOptions);
        setCurrentImage(url ? address + url : null);
      }
    } else {
      const url = findBestMatchingImage(selectedOptions);
      setCurrentImage(url ? address + url : null);
    }
  }, [selectedOptions, customImage, generatedImage, compositeImage, currentStep]);

  // ── Canvas drawing ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawingMode) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (points.length === 0) return;
    ctx.strokeStyle = "#ff0000"; ctx.lineWidth = 3;
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath();
    points.forEach((p, i) => {
      const x = p.x * canvas.width, y = p.y * canvas.height;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    if (points.length >= 10) { ctx.fillStyle = "rgba(255,0,0,0.1)"; ctx.fill(); }
  }, [points, isDrawingMode]);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const next = [getPos(e)];
    setIsDrawing(true); setPoints(next);
    onOutlineChange?.(next, false);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setPoints((prev) => { const next = [...prev, getPos(e)]; onOutlineChange?.(next, next.length >= 10); return next; });
  };
  const handleMouseUp = () => setIsDrawing(false);

  const showRemoveButton = !!(customImage || generatedImage) && !!onResetToDefault && currentStep === 10;
  const showCanvas = isDrawingMode && currentStep === 10;

  return (
    <Box sx={{
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", borderRadius: "20px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
      width: isMobile ? "100%" : "600px",
      height: isMobile ? "auto" : "450px",
      aspectRatio: isMobile ? "4/3" : undefined,
      backgroundColor: "#FFFFFF",
    }}>
      {currentImage ? (
        <>
          {showRemoveButton && (
            <IconButton onClick={onResetToDefault} sx={{
              position: "absolute", top: 8, left: 8, zIndex: 100,
              backgroundColor: "rgba(255,255,255,0.9)", color: "#333",
              "&:hover": { backgroundColor: "rgba(255,255,255,1)", color: "#d32f2f" },
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}>
              <CloseIcon />
            </IconButton>
          )}

          <Box component="img" src={currentImage} alt="house preview" sx={{
            width: "100%", height: "100%", margin: 0,
            borderRadius: isMobile ? 2 : 3, objectFit: "cover",
            transition: "opacity 0.4s ease-in-out",
            filter: isGeneratingImage ? "blur(8px)" : "none",
          }} />

          {isGeneratingImage && (
            <Box sx={{
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
              background: "linear-gradient(90deg, transparent 0%, rgba(33,150,243,0.3) 50%, transparent 100%)",
              backgroundSize: "200% 100%", animation: "scan 2s linear infinite", pointerEvents: "none",
              "@keyframes scan": { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
            }} />
          )}

          {showCanvas && (
            <canvas ref={canvasRef}
              onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", cursor: "crosshair", zIndex: 50 }}
            />
          )}
        </>
      ) : (
        <Box component="img" src={defaultImage} alt="default" sx={{
          width: "100%", height: "100%", margin: 0,
          borderRadius: isMobile ? 2 : 3, objectFit: "cover",
        }} />
      )}
    </Box>
  );
};

export default HousePreview;