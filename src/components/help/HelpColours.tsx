import React from "react";
import { Box } from "@mui/material";
import { RENDER_PARENTS, STEP_11_COLOUR } from "../../data/steps/steps/step11-colour";
import OPTION_IDS from "../../data/constants/optionIds";
import address from "../../api/adress";

interface HelpColoursProps {
  isMobile?: boolean;
  type: "bricks" | "renders";
}

const HelpColours: React.FC<HelpColoursProps> = ({ isMobile, type }) => {


  const options = STEP_11_COLOUR.options.filter((option) => {
    if (!option.parent_option_id) return false;
    const parents = Array.isArray(option.parent_option_id)
      ? option.parent_option_id
      : [option.parent_option_id];

    if (type === "bricks") {
      return parents.includes(OPTION_IDS.RENDER_TYPE.BRICK_SLIPS);
    } else {
      return parents.some((p) => RENDER_PARENTS.includes(p as any));
    }
  });

  if (options.length === 0) {
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
      {options.map((option) => (
        <Box
          key={option.id}
          sx={{
            height: "62px",
            width: "95px",
            aspectRatio: "73 / 48",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            position: "relative",
            overflow: "hidden",
            cursor: "default",
            transition: "transform 0.15s ease-in-out",
            willChange: "transform",
            "&:hover": { transform: "scale(1.03)" },
            "&:hover .hover-label": { opacity: 1 },
          }}
        >
          <img
            src={address + (option.image ?? "")}
            alt={option.option_value}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              imageRendering: "crisp-edges",
            }}
            loading="eager"
            decoding="async"
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
              transition: "opacity 0.15s ease-in-out",
              my: "8px",
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

export default HelpColours;
