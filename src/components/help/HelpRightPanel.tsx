import React from "react";
import { Box, Typography } from "@mui/material";
import HelpImages from "./HelpImages/HelpImages";
import HelpTable from "./HelpTable";
import HelpColourSamples from "./HelpColourSamples";
import { HelpSection } from "../../data/steps/types";
import HelpBrickColours from "./HelpBrickColours";

interface HelpRightPanelProps {
  isMobile: boolean;
  currentHelp: HelpSection;
}

export const HelpRightPanel: React.FC<HelpRightPanelProps> = ({ isMobile, currentHelp }) => {
  return (
    <Box
      sx={{
        flex: 1,
        width: isMobile ? "100%" : "auto",
        backgroundColor: (currentHelp.useColourSamples || currentHelp.useOptionColours) ? "transparent" : "#f4f4f4",
        borderTopLeftRadius: isMobile ? 0 : "20px",
        borderBottomLeftRadius: isMobile ? 0 : "20px",
        boxSizing: "border-box",
        maxHeight: isMobile ? "auto" : "545px",
        p: isMobile ? "0px" : "28px",
        py: (currentHelp.useColourSamples || currentHelp.useOptionColours) ? "0px" : "28px",
        overflowY: isMobile ? "visible" : "auto",
        overflowX: isMobile ? "visible" : "auto",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...(!isMobile && {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }),
      }}
    >
      <Box>
        {currentHelp.side_description && (
          <Typography
            sx={{
              fontSize: "14.5px",
              color: "#000",
              mb: "16px",
              textAlign: "center",
            }}
            dangerouslySetInnerHTML={{
              __html: currentHelp.side_description,
            }}
          />
        )}
        {currentHelp.images && currentHelp.images.length > 0 && (
          <HelpImages images={currentHelp.images.map((img, index) => ({ ...img, id: index }))} isMobile={isMobile} />
        )}
        {currentHelp.table && (
          <Box sx={{ mt: 2 }}>
            <HelpTable table={currentHelp.table} />
          </Box>
        )}
        {currentHelp.useColourSamples && <HelpColourSamples />}
        {currentHelp.useOptionColours && <HelpBrickColours />}
      </Box>
      {currentHelp.disclaimer && (
        <Box sx={{ pt: "12px" }}>
          <Typography
            sx={{
              fontSize: "10px",
              color: "#8B959A",
            }}
            dangerouslySetInnerHTML={{
              __html: currentHelp.disclaimer,
            }}
          />
        </Box>
      )}
    </Box>
  );
};
