import React from "react";
import { Box, Typography, Table as MuiTable, TableBody, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CalculatedMaterials } from "../services/materialCalculator";
import { products } from "../data/products";
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
  stepsData?: StepsData;
}

type ProductEntry = (typeof products)[number];

const DataCell = styled("td")({
  padding: "16px 8px",
  borderBottom: "none",
  verticalAlign: "middle",
});

function parseSuffix(productCodeWithSuffix: string): { baseCode: string; suffix: string } | null {
  const ewiplusMatch = /^(SPI-EWIPLUS)(\d+)$/.exec(productCodeWithSuffix);
  if (ewiplusMatch) {
    return { baseCode: ewiplusMatch[1], suffix: ewiplusMatch[2] };
  }
  
  const lastPart = productCodeWithSuffix.split('-').pop() ?? '';
  const isValidSuffix =
    /^\d{3}$/.test(lastPart) ||
    /^\d+(\.\d+)?A$/.test(lastPart) ||
    /^\d{2,3}$/.test(lastPart);

  if (!isValidSuffix) return null;

  const parts = productCodeWithSuffix.split('-');
  const suffix = parts.pop() ?? '';
  return { baseCode: parts.join('-'), suffix };
}

function buildProductName(baseName: string, suffix: string, category: string): string {
  if (suffix.endsWith('A')) {
    return `${baseName} (${suffix.replace('A', '')}mm grain)`;
  }
  if (suffix.length === 3 && !Number.isNaN(Number(suffix))) {
    return `${baseName} (${Number(suffix)}mm)`;
  }
  if (category === 'fixings') {
    return `${baseName} (${suffix}mm)`;
  }
  return baseName;
}

function resolveProduct(
  productCodeWithSuffix: string,
  category: string
): { product: ProductEntry; displayCode: string; productName: string } | null {
  const direct = products.find(p => p.productCode === productCodeWithSuffix);
  if (direct) {
    return { product: direct, displayCode: productCodeWithSuffix, productName: direct.productName };
  }

  const parsed = parseSuffix(productCodeWithSuffix);
  if (!parsed) return null;

  const base = products.find(p => p.productCode === parsed.baseCode);
  if (!base) return null;

  return {
    product: base,
    displayCode: productCodeWithSuffix,
    productName: buildProductName(base.productName, parsed.suffix, category),
  };
}

function processMaterialKey(
  key: string,
  calculatedMaterials: CalculatedMaterials,
  productsList: Product[]
): void {
  if (!key.endsWith('_units')) return;

  const category = key.replace('_units', '');
  const productCodeWithSuffix = calculatedMaterials[category];
  const quantity = calculatedMaterials[key];

  const resolved = resolveProduct(productCodeWithSuffix, category);

  if (!resolved) {
    console.warn(`[ResultsTable] Product not found for code: ${productCodeWithSuffix}`);
    return;
  }

  if (quantity && quantity > 0) {
    productsList.push({
      id: resolved.displayCode,
      name: resolved.productName,
      image: resolved.product.image,
      quantity,
      unitDetail: resolved.product.unitDetail,
      link: resolved.product.link,
    });
  }
}

const ResultsTable: React.FC<ResultsTableProps> = ({
  isMobile = false,
  calculatedMaterials,
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

  const productsList: Product[] = [];
  Object.keys(calculatedMaterials).forEach(key =>
    processMaterialKey(key, calculatedMaterials, productsList)
  );

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
            {productsList.map((item, index) => (
              <TableRow
                key={`${item.id}-${index}`}
                sx={{
                  p: 0,
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
                      height: "auto0px",
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

                <DataCell sx={{ textAlign: "left", pr: "0px" }}>
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