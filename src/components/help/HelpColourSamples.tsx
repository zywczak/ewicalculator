import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { ColorOption, fetchColorsOnce, getPreloadedImageUrl } from "../../data/colorCache";

const HelpColourSamples: React.FC = () => {
  const [colors, setColors] = useState<ColorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getColourName = (code: string) =>
    code.split("-").findLast(part => Number.isNaN(Number(part))) ?? code;

  useEffect(() => {
    let isMounted = true;
    fetchColorsOnce().then((colorData) => {
      if (!isMounted) return;
      setColors(colorData);
      setLoading(false);
      if (colorData.length === 0) setError("Nie znaleziono kolorów z obrazkiem");
    }).catch((err) => {
      if (!isMounted) return;
      setError(err?.message || "Błąd pobierania kolorów");
      setLoading(false);
    });
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={3}>
        <CircularProgress size={32} />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box display="flex" justifyContent="center" py={3} color="error.main">
        {error}
      </Box>
    );
  }
  
  if (colors.length === 0) {
    return (
      <Box display="flex" justifyContent="center" py={3}>
        Brak kolorów do wyświetlenia
      </Box>
    );
  }

  return (
    <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap="8px">
      {colors.map(color => {
        const imageUrl = getPreloadedImageUrl(color.photo_uri);
        
        return (
          <Box key={color.id} sx={{
            height: "62px",
            width: "95px",
            aspectRatio: "73 / 48",
            borderRadius: "10px",
            position: "relative",
            overflow: "hidden",
            cursor: "default",
            transition: "transform 0.15s ease-in-out",
            willChange: "transform",
            "&:hover": { transform: "scale(1.03)" },
            "&:hover .hover-label": { opacity: 1 },
          }}>
            <img 
              src={imageUrl}
              alt={color.colour_code} 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover", 
                display: "block",
                imageRendering: "crisp-edges"
              }}
              loading="eager"
              decoding="async"
              onError={(e) => { e.currentTarget.style.display = "none"; }} 
            />
            <Box className="hover-label" sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(51, 51, 51, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.15s ease-in-out",
              my: "8px",
              borderRadius: "10px",
              pointerEvents: "none",
            }}>
              <Box sx={{ 
                color: "#fff", 
                fontWeight: 600, 
                fontSize: "12px", 
                textAlign: "center", 
                textShadow: "0 1px 2px rgba(0,0,0,0.5)" 
              }}>
                {getColourName(color.colour_code)}
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default HelpColourSamples;