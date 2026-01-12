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
}

const Help: React.FC<HelpProps> = ({
  open,
  onClose,
  helpSections,
  isMobile = false,
  container,
}) => {
  if (helpSections.length === 0) return null;
  const currentHelp = helpSections[0];

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
      <HelpHeader isMobile={isMobile} onClose={onClose} title={currentHelp.help_title} />
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