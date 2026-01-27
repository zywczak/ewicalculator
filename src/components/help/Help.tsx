import React from "react";
import { Dialog, Box } from "@mui/material";

import { HelpSection } from "../../data/steps/types";
import { HelpHeader } from "./HelpHeader";
import { HelpLeftPanel } from "./HelpLeftPanel";
import { HelpRightPanel } from "./HelpRightPanel";

interface HelpProps {
  open: boolean;
  onClose: () => void;
  helpSections: HelpSection[];
  isMobile?: boolean;
  container?: HTMLElement | null;
  selectedOptions?: number[];
  OPTION_IDS?: any;
}

const Help: React.FC<HelpProps> = ({
  open,
  onClose,
  helpSections,
  isMobile = false,
  container,
  selectedOptions = [],
  OPTION_IDS,
}) => {
  if (helpSections.length === 0) return null;
  let currentHelp = helpSections[0];
  // Sprawdź czy to krok colour i czy wybrano Brick Slips
  const isColourStep = helpSections.length > 1 && helpSections[1]?.help_title?.toLowerCase().includes("brick slip");
  const BRICK_SLIPS_ID = OPTION_IDS?.RENDER_TYPE?.BRICK_SLIPS;
  if (isColourStep && Array.isArray(selectedOptions) && BRICK_SLIPS_ID && selectedOptions.includes(BRICK_SLIPS_ID)) {
    currentHelp = helpSections[1];
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={false}
      maxWidth={false}
      container={container}
      sx={{
        ...(isMobile
          ? {
              "& .MuiBackdrop-root": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              "& .MuiDialog-container": {
                alignItems: "center",
                justifyContent: "center",
              },
            }
          : {
              position: "absolute",
              inset: 0,
              "& .MuiBackdrop-root": {
                position: "absolute",
                backgroundColor: "transparent",
                boxShadow: "none",
              },
              "& .MuiDialog-container": {
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }),
      }}
      slotProps={{
        paper: {
          sx: {
            width: isMobile ? "100vw" : "1245px",
            maxWidth: isMobile ? "100vw" : "1245px",
            height: "auto",
            maxHeight: isMobile ? "100vh" : "625px",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: isMobile
              ? "none"
              : "0px 0px 20px rgba(0, 0, 0, 0.2)",
            pb: isMobile ? 0 : "40px",
            m: isMobile ? 0 : "auto",
          },
        },
      }}
    >
      <HelpHeader isMobile={isMobile} onClose={onClose} />
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          height: "100%",
          width: "100%",
          overflowY: isMobile ? "auto" : "visible",
          overflowX: "hidden",
          ...(isMobile && {
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }),
        }}
      >
        <HelpLeftPanel isMobile={isMobile} currentHelp={currentHelp} />
        <HelpRightPanel isMobile={isMobile} currentHelp={currentHelp} />
      </Box>
    </Dialog>
  );
};

export default Help;