import React from "react";
import { Box } from "@mui/material";
import { STEP_11_COLOUR } from "../../data/steps/steps/step11-colour";
import address from "../../api/adress";

interface HelpBrickColoursProps {
  isMobile?: boolean;
}

const HelpBrickColours: React.FC<HelpBrickColoursProps> = ({ isMobile }) => {
  const options = STEP_11_COLOUR.options;
  if (!options || options.length === 0) {
    return (
      <Box display="flex" justifyContent="center" py={3}>
        No colours to display
      </Box>
    );
  }

  return (
    <Box
      display={isMobile ? "flex" : "grid"}
      flexWrap={isMobile ? "wrap" : undefined}
      justifyContent={isMobile ? "center" : undefined}
      gridTemplateColumns={isMobile ? undefined : "repeat(7, 1fr)"}
      gap="8px"
    >
      {options.map(option => (
        <Box
          key={option.id}
          sx={{
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
          }}
        >
          <img
            src={address + (option.option_image ?? option.image ?? "")}
            alt={option.option_value}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />

          <Box
            className="hover-label"
            sx={{
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
            }}
          >
            <Box
              sx={{
                color: "#fff",
                fontWeight: 600,
                fontSize: "12px",
                textAlign: "center",
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              {option.option_value}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HelpBrickColours;
