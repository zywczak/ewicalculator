import React from "react";
import { Box, Typography, Table as MuiTable, TableBody, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CalculatedMaterials } from "../services/materialCalculator";
import { getProductForStep, getBrickSlipsAdhesive } from "../services/productResolver";
import { StepsData } from "../data/steps/types";
import adress from "../api/adress"

interface Product {
  id: string;
  name: string;
  image: string;
  quantity: number;
  unitDetail: string;
  link?: string;
}

interface ResultsTableProps {
  isMobile?: boolean;
  calculatedMaterials: CalculatedMaterials | null;
  selectedOptions?: number[];
  stepsData?: StepsData;
}

const DataCell = styled("td")({
  padding: "16px 8px",
  borderBottom: "none",
  verticalAlign: "middle",
});

const ResultsTable: React.FC<ResultsTableProps> = ({ 
  isMobile = false, 
  calculatedMaterials,
  selectedOptions = [],
  stepsData
}) => {
  if (!calculatedMaterials || !stepsData) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          width: isMobile ? "100%" : "600px",
          height: isMobile ? "auto" : "450px",
          backgroundColor: "#FFFFFF",
          p: "30px",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          Complete the form to see your material list
        </Typography>
      </Box>
    );
  }

  // Helper function to get product from substep (searches recursively)
  const getProductFromSubstep = (stepId: number, substepId: number): any => {
    const step = stepsData.steps.find(s => s.id === stepId);
    if (!step?.substeps) return null;
    
    const findSubstep = (substeps: any[]): any => {
      for (const substep of substeps) {
        if (substep.id === substepId) {
          if (substep?.product) return substep.product;
          if (substep?.products?.default) return substep.products.default;
          return null;
        }
        if (substep.substeps && substep.substeps.length > 0) {
          const found = findSubstep(substep.substeps);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findSubstep(step.substeps);
  };

  // Helper function to add product to list
  const addProduct = (quantity: number | undefined, productInfo: any) => {
    if (quantity && quantity > 0 && productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  };

  // Convert calculated materials to product list
  const products: Product[] = [];
  const step9 = stepsData.steps.find(s => s.id === 9);
  const renderOption = step9?.options?.find(opt => selectedOptions.includes(opt.id));

  // Main products
  addProduct(calculatedMaterials.insulation_material_units, getProductForStep(5, selectedOptions, stepsData));
  addProduct(calculatedMaterials.adhesive_units, stepsData.steps.find(s => s.id === 6)?.products?.adhesive);
  addProduct(calculatedMaterials.mesh_units, getProductForStep(6, selectedOptions, stepsData));
  addProduct(calculatedMaterials.fixings_units, getProductForStep(7, selectedOptions, stepsData));
  addProduct(calculatedMaterials.primer_20_units, renderOption?.products?.["primer-20"]);
  addProduct(calculatedMaterials.primer_7_units, renderOption?.products?.["primer-7"]);
  addProduct(calculatedMaterials.render_units, renderOption?.products?.render);
  
  // Brick slips (only if brick slips render type is selected)
  if (selectedOptions.includes(44)) { // OPTION_IDS.RENDER_TYPE.BRICK_SLIPS
    const step11 = stepsData.steps.find(s => s.id === 11);
    const colourOption = step11?.options?.find(opt => selectedOptions.includes(opt.id));
    addProduct(calculatedMaterials.brick_slips_units, colourOption?.product);
  }
  
  addProduct(calculatedMaterials.brick_slips_adhesive_units, getBrickSlipsAdhesive(selectedOptions, stepsData));
  addProduct(calculatedMaterials.paint_units, getProductForStep(11, selectedOptions, stepsData));

  // Beads & trims
  addProduct(calculatedMaterials.corner_beads, getProductFromSubstep(8, 19));
  addProduct(calculatedMaterials.stop_beads, getProductFromSubstep(8, 20));
  addProduct(calculatedMaterials.bellcast_beads, getProductFromSubstep(8, 21));
  addProduct(calculatedMaterials.window_reveal, getProductFromSubstep(8, 22));
  
  // Starter tracks (metal or plastic)
  if (calculatedMaterials.starter_tracks && calculatedMaterials.starter_tracks > 0) {
    const isMetalType = selectedOptions.includes(42); // OPTION_IDS.STARTER_TRACKS.METAL
    const isPlasticType = selectedOptions.includes(43); // OPTION_IDS.STARTER_TRACKS.PLASTIC
    const starterTrackProduct = isMetalType ? getProductFromSubstep(8, 18) : 
                                 isPlasticType ? getProductFromSubstep(8, 32) : null;
    addProduct(calculatedMaterials.starter_tracks, starterTrackProduct);
  }

  // Additional products
  addProduct(calculatedMaterials.levelling_coat, getProductFromSubstep(12, 27));
  addProduct(calculatedMaterials.fungicidal_wash, getProductFromSubstep(12, 28));
  addProduct(calculatedMaterials.blue_film, getProductFromSubstep(12, 29));
  addProduct(calculatedMaterials.orange_tape, getProductFromSubstep(12, 30));
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
        backgroundColor: "#FFFFFF",

        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          height: 450,
          overflowY: "auto",

          scrollbarWidth: "none",
          width: "100%",

          msOverflowStyle: "none",

          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >

        <MuiTable sx={{ borderCollapse: "collapse" }}>
          <colgroup>
            <col style={{ width: isMobile ? "60px" : "80px" }} />
            <col style={{ width: "auto" }} />
            <col style={{ width: isMobile ? "80px" : "120px" }} />
          </colgroup>

          <TableBody>
            {products.map((item, index) => (
              <TableRow
                key={`${item.id}-${index}`}
                onClick={() => {
                  if (item.link) {
                    window.open(item.link, '_blank', 'noopener,noreferrer');
                  }
                }}
                sx={{
                  backgroundColor: index % 2 === 1 ? "#F9F9F9" : "transparent",
                  cursor: item.link ? "pointer" : "default",
                  "&:hover": item.link ? {
                    backgroundColor: index % 2 === 1 ? "#E8E8E8" : "#F5F5F5",
                  } : {},
                }}
              >
                <DataCell sx={{ textAlign: "center", p: 0, pl: "20px" }}>
                  <img
                    src={adress + item.image}
                    alt={item.id}
                    style={{
                      width: isMobile ? 40 : 60,
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </DataCell>

                <DataCell>
                  <Typography variant="body2" sx={{ color: "#333", lineHeight: 1.4 }}>
                    <Box component="span" sx={{ fontWeight: 700 }}>
                      {item.id}
                    </Box>
                    <Box component="span" sx={{ color: "#999", fontWeight: 400 }}>
                      {" - "}{item.name}
                    </Box>
                  </Typography>
                </DataCell>

                <DataCell sx={{ textAlign: "left", pr: "0 px" }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "#666" }}>
                    {item.quantity}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#AAA", display: "block" }}>
                    {item.unitDetail}
                  </Typography>
                </DataCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </Box>
    </Box>
  );
};

export default ResultsTable;
