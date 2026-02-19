  import React, { useState, useEffect } from "react";
  import { Box, Typography, IconButton } from "@mui/material";
  import { StepInputProps } from "../Step/StepInput";
  import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
  import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
  import { RENDER_PARENTS, STEP_11_COLOUR } from '../../../data/steps/steps/step11-colour';
  import OPTION_IDS from '../../../data/constants/optionIds';

  interface ColorOption {
    id: number;
    colour_code: string;
    json_value: string | number;
    photo_uri: string;
  }

  const ITEMS_PER_PAGE = 18;

  const BRICK_SLIPS_OPTION_ID = OPTION_IDS.RENDER_TYPE.BRICK_SLIPS;

  const BRICK_SLIPS_COLORS = STEP_11_COLOUR.options
    .filter(opt => {
      if (!opt.parent_option_id) return false;
      const parents = Array.isArray(opt.parent_option_id) ? opt.parent_option_id : [opt.parent_option_id];
      return parents.includes(BRICK_SLIPS_OPTION_ID);
    })
    .map(opt => ({
      id: opt.id,
      colour_code: opt.option_value,
      json_value: opt.json_value ?? "",
      photo_uri: opt.image ?? "",
    }));

  const RENDER_COLORS = STEP_11_COLOUR.options
    .filter(opt => {
      if (!opt.parent_option_id) return false;
      const parents = Array.isArray(opt.parent_option_id) ? opt.parent_option_id : [opt.parent_option_id];
      return parents.some(p => RENDER_PARENTS.includes(p as any));
    })
    .map(opt => ({
      id: opt.id,
      colour_code: opt.option_value,
      json_value: opt.json_value ?? "",
      photo_uri: opt.image ?? "",
    }));

  const ColourStepInput: React.FC<StepInputProps> = ({
    value,
    onChange,
    isMobile = false,
    selectedParentOptionIds = [],
    disabled = false,
  }) => {
    const [page, setPage] = useState(0);
    const [colors, setColors] = useState<ColorOption[]>([]);

    useEffect(() => {
      const isBrickSlips = selectedParentOptionIds.includes(BRICK_SLIPS_OPTION_ID);
      if (isBrickSlips) {
        setColors(BRICK_SLIPS_COLORS);
      } else {
        setColors(RENDER_COLORS);
      }
    }, [selectedParentOptionIds]);

    const totalPages = Math.ceil(colors.length / ITEMS_PER_PAGE);
    const startIndex = page * ITEMS_PER_PAGE;
    const currentPageColors = colors.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleSelect = (colorId: number, jsonValue: string) => {
      // Always use json_value for consistency
      onChange(jsonValue, colorId);
    };

    const nextPage = () => setPage(prev => Math.min(prev + 1, totalPages - 1));
    const prevPage = () => setPage(prev => Math.max(prev - 1, 0));

    return (
      <Box sx={{ width: isMobile ? "calc(100% - 48px)" : "240px", mx: "24px" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: "24px" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "#333" }}>
            Page <span style={{ color: "#333" }}>{page + 1}</span>
            <span style={{ color: "#aaa" }}>/{totalPages}</span>
          </Typography>
          <Box sx={{ flexGrow: 1, height: "1px", backgroundColor: "#ccc", mx: "10px" }} />
          <Box display="flex" alignItems="center" gap={"32px"}>
            <IconButton onClick={prevPage} disabled={page === 0} sx={{ backgroundColor: "#c4c4c4", height: "30px", width: "30px", "&:hover": { backgroundColor: "#D0D0D0" }, "&.Mui-disabled": { backgroundColor: "#E0E0E0", color: "#aaa" } }}>
              <ArrowBackRoundedIcon sx={{ fontSize: 18, color: "#fff", "&.Mui-disabled": { color: "#aaa" } }} />
            </IconButton>
            <IconButton onClick={nextPage} disabled={page === totalPages - 1} sx={{ backgroundColor: "#c4c4c4", height: "30px", width: "30px", "&:hover": { backgroundColor: "#D0D0D0" }, "&.Mui-disabled": { backgroundColor: "#e0e0e0ff", color: "#aaa" } }}>
              <ArrowForwardRoundedIcon sx={{ fontSize: 18, color: "#fff", "&.Mui-disabled": { color: "#aaa" } }} />
            </IconButton>
          </Box>
        </Box>

        <Box display="grid" gridTemplateColumns={isMobile ? "repeat(4, 1fr)" : "repeat(3, 1fr)"} gap={"8px"}>
          {currentPageColors.map(color => {
            const isSelected = value === color.colour_code || value === color.json_value;

            return (
              <Box
                key={color.id}
                onClick={() => !disabled && handleSelect(color.id, String(color.json_value))}
                sx={{
                  height: isMobile ? "auto" : "45px",
                  width: isMobile ? "auto" : "73px",
                  aspectRatio: "73/48",
                  borderRadius: "12px",
                  cursor: disabled ? "not-allowed" : "pointer",
                  pointerEvents: disabled ? "none" : "auto",
                  opacity: disabled ? 0.6 : 1,
                  backgroundColor: "#ffffff",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.15s ease-in-out",
                  willChange: "transform",
                  ...(disabled ? {} : { "&:hover": { transform: "scale(1.03)" } }),
                }}
              >
                <img 
                  src={color.photo_uri}
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
                />
                {isSelected && (
                  <Box sx={{ 
                    position: "absolute", 
                    borderRadius: "10px", 
                    inset: 0, 
                    backgroundColor: "#3333339d", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    my: "4px" 
                  }}>
                    <Typography sx={{ 
                      color: "#fff", 
                      fontWeight: 600, 
                      fontSize: "12px", 
                      textAlign: "center" 
                    }}>
                      {color.colour_code.split('-').pop() || color.colour_code}
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  export default ColourStepInput;