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

const resolveCurrentHelp = (
  helpSections: HelpSection[],
  selectedOptions: number[],
  OPTION_IDS?: any
): HelpSection => {
  const isBrickSlipsColourStep =
    helpSections.length > 1 &&
    helpSections[1]?.help_title?.toLowerCase().includes("brick slip");

  const brickSlipsId = OPTION_IDS?.RENDER_TYPE?.BRICK_SLIPS;
  const brickSlipsSelected =
    brickSlipsId && selectedOptions.includes(brickSlipsId);

  if (isBrickSlipsColourStep && brickSlipsSelected) {
    return helpSections[1];
  }

  return helpSections[0];
};

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

  const currentHelp = resolveCurrentHelp(helpSections, selectedOptions, OPTION_IDS);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth={false}
      container={container}
      disableScrollLock={false}
      sx={{
        ...(isMobile
          ? {
              "& .MuiBackdrop-root": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              // Czarne tło całego ekranu — widoczne jako bary gdy treść jest krótsza
              "& .MuiDialog-container": {
                backgroundColor: "#0000004f",
                alignItems: "flex-start",
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
            width: isMobile ? "100%" : "1245px",
            maxWidth: isMobile ? "100%" : "1245px",
            height: "auto",
            maxHeight: isMobile ? "100vh" : "625px",
            borderRadius: isMobile ? 0 : "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: isMobile ? "none" : "0px 0px 20px rgba(0, 0, 0, 0.2)",
            pb: isMobile ? 0 : "40px",
            m: isMobile ? 0 : "auto",
            my: "auto",
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