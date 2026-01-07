import React from "react";
import { Box, Typography, Table as MuiTable, TableBody, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import productImage from "../../assets/nanodrex.png";

interface Product {
  id: string;
  name: string;
  fullName: string;
  image: string;
  quantity: string;
  unitDetail: string;
}

const sampleData: Product[] = [
  {
    id: "EWI-225",
    name: "Premium Basecoat / Adhesive 25kg",
    fullName: "EWI-225 - Premium Basecoat / Adhesive 25kg",
    image: productImage,
    quantity: "28 bags",
    unitDetail: "25kg/bag",
  },
  {
    id: "PXM-165702",
    name: "Fibreglass Reinforcement Mesh (White) - 165g (White Sticker)",
    fullName: "PXM-165702 - Fibreglass Reinforcement Mesh (White) - 165g (White Sticker)",
    image: productImage,
    quantity: "2 rolls",
    unitDetail: "50 sqm/roll",
  },
  {
    id: "ROC-470-110",
    name: "Rockwool Dual Density Slab (110mm) - 1x 1.2 x 0.6 0.72m2 / slab",
    fullName: "ROC-470-110 - Rockwool Dual Density Slab (110mm) - 1x 1.2 x 0.6 0.72m2 / slab",
    image: productImage,
    quantity: "7 packs",
    unitDetail: "50 sqm/roll",
  },
  {
    id: "EWI-225",
    name: "Premium Basecoat / Adhesive 25kg",
    fullName: "EWI-225 - Premium Basecoat / Adhesive 25kg",
    image: productImage,
    quantity: "5 bags",
    unitDetail: "25kg/bag",
  },
  {
    id: "PXM-165702",
    name: "Fibreglass Reinforcement Mesh (White) - 165g (White Sticker)",
    fullName: "PXM-165702 - Fibreglass Reinforcement Mesh (White) - 165g (White Sticker)",
    image: productImage,
    quantity: "1 rolls",
    unitDetail: "50 sqm/roll",
  },
  {
    id: "WKR-FIXPLUG10-180",
    name: "FIXPLUG10 - PLASTIC FIXING EWI (180MM) - 10MM 200 PIECES",
    fullName: "WKR-FIXPLUG10-180 - FIXPLUG10 - PLASTIC FIXING EWI (180MM) - 10MM 200 PIECES",
    image: productImage,
    quantity: "1 boxes",
    unitDetail: "200 pcs/box",
  },
  {
    id: "EWI-333-7",
    name: "Top Coat Primer - 7kg",
    fullName: "EWI-333-7 - Top Coat Primer - 7kg",
    image: productImage,
    quantity: "1 buckets",
    unitDetail: "7kg/bucket",
  },
  {
    id: "EWI-075-1A",
    name: "Silicone Render 25kg - 1mm - Base A",
    fullName: "EWI-075-1A - Silicone Render 25kg - 1mm - Base A",
    image: productImage,
    quantity: "1 buckets",
    unitDetail: "25kg/bucket",
  },
  {
    id: "EXTRA-1",
    name: "Dodatkowy produkt 1",
    fullName: "EXTRA-1 - Dodatkowy produkt 1",
    image: productImage,
    quantity: "1 szt.",
    unitDetail: "szt.",
  },
  {
    id: "EXTRA-2",
    name: "Dodatkowy produkt 2",
    fullName: "EXTRA-2 - Dodatkowy produkt 2",
    image: productImage,
    quantity: "2 szt.",
    unitDetail: "szt.",
  },
  {
    id: "EXTRA-3",
    name: "Dodatkowy produkt 3",
    fullName: "EXTRA-3 - Dodatkowy produkt 3",
    image: productImage,
    quantity: "3 szt.",
    unitDetail: "szt.",
  },
  {
    id: "EXTRA-4",
    name: "Dodatkowy produkt 4",
    fullName: "EXTRA-4 - Dodatkowy produkt 4",
    image: productImage,
    quantity: "4 szt.",
    unitDetail: "szt.",
  },
];

const DataCell = styled("td")({
  padding: "16px 8px",
  borderBottom: "none",
  verticalAlign: "middle",
});

const ResultsTable: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
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
        p: "30px",
        px: isMobile ? "5px" : "30px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          height: 400,
          overflowY: "auto",

          maskImage: "linear-gradient(to bottom, transparent 0%, black 40px, black calc(100% - 40px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40px, black calc(100% - 40px), transparent 100%)",

          scrollbarWidth: "none",

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
            {sampleData.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  backgroundColor: index % 2 === 1 ? "#F9F9F9" : "transparent",
                }}
              >
                <DataCell sx={{ textAlign: "center", p: 0 }}>
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
                      - {item.name}
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