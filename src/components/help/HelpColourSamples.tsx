import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { ColorOption, fetchColorsOnce } from "../../data/colorCache";

const HelpColourSamples: React.FC = () => {
  const [colors, setColors] = useState<ColorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getColourName = (code: string) =>
    code.split("-").findLast(part => Number.isNaN(Number(part))) ?? code;

  useEffect(() => {
    const loadColors = async () => {
      try {
        setLoading(true);
        setError(null);

        const colorData = await fetchColorsOnce();
        setColors(colorData);

        if (colorData.length === 0) setError("Nie znaleziono kolorów z obrazkiem");
      } catch (err: any) {
        console.error("Error fetching colors:", err);
        setError(err.message || "Błąd pobierania kolorów");
      } finally {
        setLoading(false);
      }
    };

    loadColors();
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" py={3}><CircularProgress size={32} /></Box>;
  if (error) return <Box display="flex" justifyContent="center" py={3} color="error.main">{error}</Box>;
  if (colors.length === 0) return <Box display="flex" justifyContent="center" py={3}>Brak kolorów do wyświetlenia</Box>;

  return (
    <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap="8px">
      {colors.map(color => (
        <Box key={color.id} sx={{
          height: "62px",
          width: "95px",
          aspectRatio: "73 / 48",
          borderRadius: "10px",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
          transition: "all 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.03)" },
          "&:hover .hover-label": { opacity: 1 },
        }}>
          <img src={color.photo_uri} alt={color.colour_code} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            loading="lazy"
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
            transition: "opacity 0.2s ease-in-out",
            mx: "8px",
            borderRadius: "10px",
            pointerEvents: "none",
          }}>
            <Box sx={{ color: "#fff", fontWeight: 600, fontSize: "12px", textAlign: "center", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
              {getColourName(color.colour_code)}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HelpColourSamples;
