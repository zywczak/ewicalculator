import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { HelpSection } from "../../data/steps/types";

interface HelpLeftPanelProps {
  isMobile: boolean;
  currentHelp: HelpSection;
}

export const HelpLeftPanel: React.FC<HelpLeftPanelProps> = ({ isMobile, currentHelp }) => {
  return (
    <Box
      sx={{
        pl: isMobile ? "16px" : "32px",
        pr: isMobile ? "16px" : "24px",
        pb: isMobile ? "28px" : 0,
        pt: "10px",
        flex: isMobile ? "0 0 auto" : "0 0 327px",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {!isMobile && (
        <>
          <Typography sx={{ fontWeight: 700, mb: "28px", color: "#333333", fontSize: "16px" }}>
            Help
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: "16px",
              lineHeight: "38px",
              fontSize: "32px",
            }}
          >
            {currentHelp.help_title}
          </Typography>
          <Divider sx={{ color: "#D0DBE0", mb: "36px" }} />
        </>
      )}
      <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
        <Typography
          variant="body1"
          sx={{ fontWeight: 400, fontSize: "14px" }}
          dangerouslySetInnerHTML={{ __html: currentHelp.upper_description || "" }}
        />
        <Typography
          variant="body1"
          sx={{ fontWeight: 400, fontSize: "14px" }}
          dangerouslySetInnerHTML={{ __html: currentHelp.downer_description || "" }}
        />
      </Box>
    </Box>
  );
};
