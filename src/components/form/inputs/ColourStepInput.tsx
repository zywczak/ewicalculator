import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { StepInputProps } from "../Step/StepInput";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import address from "../../../api/adress";

const ITEMS_PER_PAGE = 18;

const ColourStepInput: React.FC<StepInputProps> = ({
  step,
  value,
  onChange,
  isMobile = false,
}) => {
  const [page, setPage] = useState(0);
  const colourOptions = step.options || [];

  const totalPages = Math.ceil(colourOptions.length / ITEMS_PER_PAGE);
  const startIndex = page * ITEMS_PER_PAGE;
  const currentPageOptions = colourOptions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSelect = (optionId: number, colour: string) => {
    onChange(colour, optionId);
  };

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  return (
    <Box sx={{ width: isMobile ? "calc(100% - 48px)" : "240px", mx: "24px" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}

      >
        <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "#333" }}>
          Page <span style={{ color: "#333" }}>{page + 1}</span>
          <span style={{ color: "#aaa" }}>/{totalPages}</span>
        </Typography>

        <Box sx={{ flexGrow: 1, height: "1px", backgroundColor: "#ccc", mx: "10px" }} />

        <Box display="flex" alignItems="center" gap={"32px"}>
          <IconButton
            onClick={prevPage}
            disabled={page === 0}
            sx={{
              backgroundColor: "#c4c4c4",
              height: "30px",
              width: "30px",
              "&:hover": { backgroundColor: "#D0D0D0" },
              "&.Mui-disabled": {
                backgroundColor: "#E0E0E0",
                color: "#aaa",
              }
            }}
          >
            <ArrowBackRoundedIcon sx={{ fontSize: 18, color: "#fff", "&.Mui-disabled": { color: "#aaa" } }} />
          </IconButton>
          <IconButton
            onClick={nextPage}
            disabled={page === totalPages - 1}
            sx={{
              backgroundColor: "#c4c4c4",
              height: "30px",
              width: "30px",
              "&:hover": { backgroundColor: "#D0D0D0" },
              "&.Mui-disabled": {
                backgroundColor: "#e0e0e0ff",
                color: "#aaa",
              }
            }}
          >
            <ArrowForwardRoundedIcon sx={{ fontSize: 18, color: "#fff", "&.Mui-disabled": { color: "#aaa" } }} />
          </IconButton>
        </Box>

      </Box>

      <Box
        display="grid"
        gridTemplateColumns={isMobile ? "repeat(4, 1fr)" : "repeat(3, 1fr)"}
        gap={"8px"}
      >
        {currentPageOptions.map((opt) => {
          const isSelected = value === opt.json_value;

          return (
            <Box
              key={opt.id}
              onClick={() => {
                if (opt.json_value) {
                  handleSelect(opt.id, opt.json_value);
                }
              }}
              sx={{
                height: isMobile ? "auto" : "48px",
                width: isMobile ? "auto" : "73px",
                aspectRatio: "73/48",
                borderRadius: "12px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              {opt.option_image && (
                <img
                  src={address + opt.option_image}
                  alt={opt.option_value}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
              )}
              {isSelected && (
                <Box
                  sx={{
                    position: "absolute",
                    borderRadius: "12px",
                    inset: 0,
                    backgroundColor: "#3333339d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    m: "4px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {opt.option_value}
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