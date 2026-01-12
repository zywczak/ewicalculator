import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import api from "../../api/axiosApi";

interface ColorOption {
  id: number;
  colour_code: string;
  hex_code: string | null;
  thumbURI: string;
}

const HelpColourSamples: React.FC = () => {
  const [colors, setColors] = useState<ColorOption[]>([]);
  const [loading, setLoading] = useState(true);

  const getColourName = (code: string) =>
  code
    .split("-")
    .findLast(part => Number.isNaN(Number(part))) ?? code;


  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await api.post({
          action: "getColourCodes",
          filters: [{ popularColoursOnly: true }],
          start: 0,
          limit: 49,
        });
        console.log("Colour codes response:", response);

        if (response.data?.status && Array.isArray(response.data.results)) {
          setColors(response.data.results);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={3}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns= "repeat(7, 1fr)"
      gap="8px"
    >
      {colors.map((color) => (
  <Box
    key={color.id}
    sx={{
      height: "62px",
      width: "95px",
      aspectRatio: "73 / 48",
      borderRadius: "10px",
      position: "relative",
      overflow: "hidden",
      backgroundColor: color.hex_code || "#eee",
      cursor: "default",
      transition: "all 0.2s ease-in-out",

      "&:hover": {
        transform: "scale(1.03)",
      },

      "&:hover .hover-label": {
        opacity: 1,
      },
    }}
  >
    {color.thumbURI && (
      <img
        src={color.thumbURI}
        alt={color.colour_code}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    )}

    <Box
      className="hover-label"
      sx={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#33333341",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.2s ease-in-out",
        mx: "8px",
        borderRadius: "10px",
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          color: "#fff",
          fontWeight: 600,
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        {getColourName(color.colour_code)}
      </Box>
    </Box>
  </Box>
))}

    </Box>
  );
};

export default HelpColourSamples;
