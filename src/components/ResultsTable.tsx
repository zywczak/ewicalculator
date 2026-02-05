import React from "react";
import { Box, Typography, Table as MuiTable, TableBody, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CalculatedMaterials } from "../services/materialCalculator";
import { getProductForStep, getBrickSlipsAdhesive } from "../services/productResolver";
import { StepsData } from "../data/steps/types";

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

  // Convert calculated materials to product list
  const products: Product[] = [];

  // Get product info from stepsData based on selected options
  
  // Insulation material (step 5)
  if (calculatedMaterials.insulation_material_units > 0) {
    const productInfo = getProductForStep(5, selectedOptions, stepsData);
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.insulation_material_units,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  // Adhesive (step 6 - adhesive product)
  if (calculatedMaterials.adhesive_units > 0) {
    const step = stepsData.steps.find(s => s.id === 6);
    const adhesiveProduct = step?.products?.adhesive;
    if (adhesiveProduct) {
      products.push({
        id: adhesiveProduct.productCode,
        name: adhesiveProduct.productName,
        image: adhesiveProduct.image,
        quantity: calculatedMaterials.adhesive_units,
        unitDetail: adhesiveProduct.unitDetail,
        link: adhesiveProduct.link
      });
    }
  }

  // Mesh (step 6 - mesh product)
  if (calculatedMaterials.mesh_units > 0) {
    const productInfo = getProductForStep(6, selectedOptions, stepsData);
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.mesh_units,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  // Fixings (step 7)
  if (calculatedMaterials.fixings_units > 0) {
    const productInfo = getProductForStep(7, selectedOptions, stepsData);
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.fixings_units,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  // Primer (from step 9 render type option)
  if (calculatedMaterials.primer_units > 0) {
    const step9 = stepsData.steps.find(s => s.id === 9);
    const renderOption = step9?.options?.find(opt => selectedOptions.includes(opt.id));
    const productInfo = renderOption?.products?.primer;
    
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.primer_units,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  // Render (from step 9 render type option)
  if (calculatedMaterials.render_units > 0) {
    const step9 = stepsData.steps.find(s => s.id === 9);
    const renderOption = step9?.options?.find(opt => selectedOptions.includes(opt.id));
    const productInfo = renderOption?.products?.render;
    
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.render_units,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  // Brick Slips (step 11 - colour selection)
  // Only show brick slips if brick slips render type is selected (ID 44)
  const isBrickSlipsSelected = selectedOptions.includes(44); // OPTION_IDS.RENDER_TYPE.BRICK_SLIPS
  
  if (isBrickSlipsSelected && calculatedMaterials.brick_slips_units && calculatedMaterials.brick_slips_units > 0) {
    // Get step 11 and find selected colour option
    const step11 = stepsData.steps.find(s => s.id === 11);
    const colourOption = step11?.options?.find(opt => selectedOptions.includes(opt.id));
    
    console.log('Brick Slips Debug:', {
      step11Exists: !!step11,
      step11OptionsCount: step11?.options?.length,
      selectedOptions,
      colourOptionId: colourOption?.id,
      colourOptionValue: colourOption?.option_value,
      hasProduct: !!colourOption?.product,
      productCode: colourOption?.product?.productCode
    });
    
    // Get product directly from colour option
    const productInfo = colourOption?.product;
    
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.brick_slips_units,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  // Brick Slips Adhesive (step 9 - render type selection)
  if (calculatedMaterials.brick_slips_adhesive_units && calculatedMaterials.brick_slips_adhesive_units > 0) {
    const productInfo = getBrickSlipsAdhesive(selectedOptions, stepsData);
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.brick_slips_adhesive_units,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  // Paint (step 11)
  if (calculatedMaterials.paint_units && calculatedMaterials.paint_units > 0) {
    const productInfo = getProductForStep(11, selectedOptions, stepsData);
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.paint_units,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  // Helper function to get product from substep (searches recursively)
  const getProductFromSubstep = (stepId: number, substepId: number): any => {
    const step = stepsData.steps.find(s => s.id === stepId);
    if (!step?.substeps) return null;
    
    // Recursive search function
    const findSubstep = (substeps: any[]): any => {
      for (const substep of substeps) {
        if (substep.id === substepId) {
          // Check if substep has direct product property
          if (substep?.product) return substep.product;
          // Otherwise check for products.default
          if (substep?.products?.default) return substep.products.default;
          return null;
        }
        // Search in nested substeps
        if (substep.substeps && substep.substeps.length > 0) {
          const found = findSubstep(substep.substeps);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findSubstep(step.substeps);
  };

  // Additional products
  if (calculatedMaterials.corner_beads && calculatedMaterials.corner_beads > 0) {
    const productInfo = getProductFromSubstep(8, 19); // Step 8, substep 19 (corner beads)
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.corner_beads,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  if (calculatedMaterials.stop_beads && calculatedMaterials.stop_beads > 0) {
    const productInfo = getProductFromSubstep(8, 20); // Step 8, substep 20 (stop beads)
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.stop_beads,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  if (calculatedMaterials.bellcast_beads && calculatedMaterials.bellcast_beads > 0) {
    const productInfo = getProductFromSubstep(8, 21); // Step 8, substep 21 (bellcast beads)
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.bellcast_beads,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  if (calculatedMaterials.window_reveal && calculatedMaterials.window_reveal > 0) {
    const productInfo = getProductFromSubstep(8, 22); // Step 8, substep 22 (window reveal)
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.window_reveal,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  if (calculatedMaterials.starter_tracks && calculatedMaterials.starter_tracks > 0) {
    // Starter tracks depends on metal/plastic choice (substep 18 or 32)
    const isMetalType = selectedOptions.includes(42); // OPTION_IDS.STARTER_TRACKS.METAL = 42
    const isPlasticType = selectedOptions.includes(43); // OPTION_IDS.STARTER_TRACKS.PLASTIC = 43
    
    let productInfo = null;
    if (isMetalType) {
      // Metal starter tracks - substep 18
      productInfo = getProductFromSubstep(8, 18);
    } else if (isPlasticType) {
      // Plastic starter tracks - substep 32
      productInfo = getProductFromSubstep(8, 32);
    }
    
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.starter_tracks,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  if (calculatedMaterials.levelling_coat && calculatedMaterials.levelling_coat > 0) {
    const productInfo = getProductFromSubstep(12, 27); // Step 12, substep 27 (levelling coat)
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.levelling_coat,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  if (calculatedMaterials.fungicidal_wash && calculatedMaterials.fungicidal_wash > 0) {
    const productInfo = getProductFromSubstep(12, 28); // Step 12, substep 28 (fungicidal wash)
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.fungicidal_wash,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  if (calculatedMaterials.blue_film && calculatedMaterials.blue_film > 0) {
    const productInfo = getProductFromSubstep(12, 29); // Step 12, substep 29 (blue film)
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.blue_film,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }

  if (calculatedMaterials.orange_tape && calculatedMaterials.orange_tape > 0) {
    const productInfo = getProductFromSubstep(12, 30); // Step 12, substep 30 (orange tape)
    if (productInfo) {
      products.push({
        id: productInfo.productCode,
        name: productInfo.productName,
        image: productInfo.image,
        quantity: calculatedMaterials.orange_tape,
        unitDetail: productInfo.unitDetail,
        link: productInfo.link
      });
    }
  }
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
        // p: "5px",

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
                    src={item.image}
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