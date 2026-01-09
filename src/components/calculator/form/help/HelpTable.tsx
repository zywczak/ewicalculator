import React from "react";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
  Box,
  Typography,
} from "@mui/material";
import { SimpleTable } from "../../../../data/tables/tables";
import address from "../../../../api/adress";

const adress = "https://precious-choux-6bd82f.netlify.app"

const CELL_PADDING = "12px";

const HeaderCell = styled(TableCell)({
  fontWeight: 600,
  textAlign: "center",
  backgroundColor: "#F5F5F5",
  border: "1px solid #e0e0e0",
  whiteSpace: "nowrap",
  padding: CELL_PADDING,
});

const RowHeaderCell = styled(TableCell)({
  fontWeight: 500,
  textAlign: "center",
  border: "1px solid #e0e0e0",
  padding: CELL_PADDING,
});

const DataCell = styled(TableCell)({
  textAlign: "center",
  border: "1px solid #e0e0e0",
  fontSize: "0.9rem",
  verticalAlign: "middle",
  padding: CELL_PADDING,
});

interface HelpTableProps {
  table: SimpleTable;
}

const HelpTable: React.FC<HelpTableProps> = ({ table }) => {
  const getCellContent = (value: string | number | boolean | null, rowType?: string, rowIcon?: string, rowScale?: [number, number]): React.ReactNode => {
    if (value === null || value === undefined || value === "") return "N/A";

    if (rowType === "boolean") {
      const boolValue = value === true || value === "true" || value === "1" || value === "yes" || value === "tak";
      return boolValue ? (
        <Typography sx={{ color: "green", fontWeight: 700, fontSize: "24px" }}>✔</Typography>
      ) : (
        <Typography sx={{ color: "red", fontWeight: 700, fontSize: "24px" }}>✘</Typography>
      );
    }

    if (rowType === "scale" && rowIcon && rowScale) {
      const numValue = Number(value);
      const [min, max] = rowScale;
      const iconSize = 24;
      const gap = 2;
      const coverPercent = Math.max(0, (max - numValue) / max) * 100;

      return (
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Box sx={{ display: "flex" }}>
            {Array.from({ length: max }).map((_, i) => (
              <img
                key={i}
                src={adress + rowIcon}
                alt="scale-icon"
                style={{ width: iconSize, height: iconSize, marginRight: i < max - 1 ? gap : 0 }}
              />
            ))}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: `${coverPercent}%`,
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
          />
        </Box>
      );
    }

    if (typeof value === "string" && value.includes("<")) {
      return <span dangerouslySetInnerHTML={{ __html: value }} />;
    }

    return value;
  };

  return (
    <Box>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          lineHeight: 'normal',
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <MuiTable
          size="small"
          sx={{
            borderCollapse: "collapse",
            tableLayout: "auto",
            width: "100%",
            minWidth: "max-content",
          }}
        >
          {table.columns.length > 0 && (
            <TableHead>
              <TableRow>
                <HeaderCell
                  sx={{
                    backgroundColor: "#f5f5f5",
                    border: "none",
                    borderLeft: "3px solid #f5f5f5",
                    borderTop: "3px solid #f5f5f5",
                  }}
                />
                {table.columns.map((col, idx) => (
                  <HeaderCell
                    key={idx}
                    sx={{
                      whiteSpace: "wrap",
                      borderTop: col.borderColor ? `3px solid ${col.borderColor}` : "3px solid #f5f5f5",
                      background: col.backgroundColor || undefined,
                      padding: 0,
                      position: "relative",
                      overflow: "hidden",
                      minHeight: "120px",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {col.image && (
                        <img
                          src={adress + col.image}
                          alt={col.label || "header-image"}
                          style={{
                            width: "100%",
                            maxWidth: "120px",
                            height: "auto",
                            objectFit: "contain",
                          }}
                        />
                      )}
                      {col.label && (
                        <Box
                          sx={{
                            position: col.image ? "absolute" : "static",
                            bottom: col.image ? 0 : "auto",
                            width: col.image ? "100%" : "auto",
                            backgroundColor: col.image ? "rgba(255, 255, 255, 0.8)" : "transparent",
                            padding: "8px 12px",
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1rem", lineHeight: 'normal' }}>
                            {col.label}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </HeaderCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {table.rows.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                <RowHeaderCell sx={{ whiteSpace: "wrap" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500, textAlign: "center" }}>
                      {row.label}
                    </Typography>
                  </Box>
                </RowHeaderCell>
                {row.values.map((value, colIdx) => (
                  <DataCell key={colIdx}>
                    {getCellContent(value, row.type, row.icon, row.scale)}
                  </DataCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Box>
  );
};

export default HelpTable;
