import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { StepInputProps } from "../StepInput";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

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
              onClick={() => handleSelect(opt.id, opt.json_value!)}
              sx={{
                height: isMobile ? "auto" : "48px",
                width: isMobile ? "auto" : "73px",
                aspectRatio: "73/48",
                borderRadius: "12px",
                cursor: "pointer",
                backgroundColor: opt.json_value || "#eee",
                position: "relative",
                transition: "all 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
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













































// import React, { useState, useEffect } from "react";
// import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
// import { StepInputProps } from "../StepInput";
// import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
// import api from "../../../../../api/axiosApi";

// const ITEMS_PER_PAGE = 18;

// interface ColorOption {
//   id: number;
//   colour_code: string;
//   hex_code: string | null;
//   thumbURI: string;
// }

// const ColourStepInput: React.FC<StepInputProps> = ({
//   step,
//   value,
//   onChange,
//   isMobile = false,
// }) => {
//   const [page, setPage] = useState(0);
//   const [colors, setColors] = useState<ColorOption[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchColors = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         const response = await api.post({
//           action: "getColourCodes",
//           filters: [{ popularColoursOnly: true }],
//           start: 0,
//           limit: 72
//         });

//         if (response.data?.status && Array.isArray(response.data.results)) {
//           setColors(response.data.results);
//         } else {
//           setError("Failed to load colors");
//         }
//       } catch (err) {
//         console.error("Error fetching colors:", err);
//         setError("Failed to load colors");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchColors();
//   }, []);

//   const totalPages = Math.ceil(colors.length / ITEMS_PER_PAGE);
//   const startIndex = page * ITEMS_PER_PAGE;
//   const currentPageColors = colors.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   const handleSelect = (colorId: number, colorCode: string) => {
//     onChange(colorCode, colorId);
//   };

//   const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
//   const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));

//   if (loading) {
//     return (
//       <Box sx={{ width: isMobile ? "calc(100% - 48px)" : "240px", mx: "24px", display: "flex", justifyContent: "center", py: 4 }}>
//         <CircularProgress size={40} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ width: isMobile ? "calc(100% - 48px)" : "240px", mx: "24px", py: 4 }}>
//         <Typography color="error" textAlign="center">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ width: isMobile ? "calc(100% - 48px)" : "240px", mx: "24px" }}>
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="space-between"
//         sx={{ mb: "12px" }}
//       >
//         <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "#333" }}>
//           Page <span style={{ color: "#333" }}>{page + 1}</span>
//           <span style={{ color: "#aaa" }}>/{totalPages}</span>
//         </Typography>

//         <Box sx={{ flexGrow: 1, height: "1px", backgroundColor: "#ccc", mx: "10px" }} />

//         <Box display="flex" alignItems="center" gap={"32px"}>
//           <IconButton
//             onClick={prevPage}
//             disabled={page === 0}
//             sx={{
//               backgroundColor: "#c4c4c4",
//               height: "30px",
//               width: "30px",
//               "&:hover": { backgroundColor: "#D0D0D0" },
//               "&.Mui-disabled": {
//                 backgroundColor: "#E0E0E0",
//                 color: "#aaa",
//               }
//             }}
//           >
//             <ArrowBackRoundedIcon sx={{ fontSize: 18, color: "#fff", "&.Mui-disabled": { color: "#aaa" } }} />
//           </IconButton>
//           <IconButton
//             onClick={nextPage}
//             disabled={page === totalPages - 1}
//             sx={{
//               backgroundColor: "#c4c4c4",
//               height: "30px",
//               width: "30px",
//               "&:hover": { backgroundColor: "#D0D0D0" },
//               "&.Mui-disabled": {
//                 backgroundColor: "#e0e0e0ff",
//                 color: "#aaa",
//               }
//             }}
//           >
//             <ArrowForwardRoundedIcon sx={{ fontSize: 18, color: "#fff", "&.Mui-disabled": { color: "#aaa" } }} />
//           </IconButton>
//         </Box>
//       </Box>

//       <Box
//         display="grid"
//         gridTemplateColumns={isMobile ? "repeat(4, 1fr)" : "repeat(3, 1fr)"}
//         gap={"8px"}
//       >
//         {currentPageColors.map((color) => {
//           const isSelected = value === color.colour_code;

//           return (
//             <Box
//               key={color.id}
//               onClick={() => handleSelect(color.id, color.colour_code)}
//               sx={{
//                 height: isMobile ? "auto" : "45px",
//                 width: isMobile ? "auto" : "73px",
//                 aspectRatio: "73/48",
//                 borderRadius: "12px",
//                 cursor: "pointer",
//                 position: "relative",
//                 overflow: "hidden",
//                 transition: "all 0.2s ease-in-out",
//                 "&:hover": { transform: "scale(1.03)" },
//               }}
//             >
//               {color.thumbURI ? (
//                 <img
//                   src={color.thumbURI}
//                   alt={color.colour_code}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     display: "block",
//                   }}
//                   onError={(e) => {
//                     e.currentTarget.style.display = "none";
//                     (e.currentTarget.parentElement as HTMLElement).style.backgroundColor = color.hex_code || "#eee";
//                   }}
//                 />
//               ) : (
//                 <Box sx={{ width: "100%", height: "100%", backgroundColor: color.hex_code || "#eee" }} />
//               )}

//               {isSelected && (
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     borderRadius: "10px",
//                     inset: 0,
//                     backgroundColor: "#3333339d",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     m: "4px",
//                   }}
//                 >
//                   <Typography
//                     sx={{
//                       color: "#fff",
//                       fontWeight: 600,
//                       fontSize: "12px",
//                       textAlign: "center",
//                     }}
//                   >
//                     {color.colour_code.split('-').pop() || color.colour_code}
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// };

// export default ColourStepInput;

