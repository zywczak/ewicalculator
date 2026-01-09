import React from "react";
import {
  Dialog,
  Typography,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HelpImages from "./HelpImages";
import HelpTable from "./HelpTable";
import { HelpSection } from "../../../../data/steps/stepsData";
import HelpColourSamples from "./HelpColourSamples";

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
  helpSections: HelpSection[];
  isMobile?: boolean;
  container?: HTMLElement | null;
}

const HelpModal: React.FC<HelpModalProps> = ({
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
        paper : {
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
      {isMobile ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pl: isMobile ? "16px" : "32px",
            pr: "10px",
            py: "10px",
          }}
        >
          <Typography
            sx={{ fontWeight: 700, color: "#333333", fontSize: "16px" }}
          >
            Help
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              backgroundColor: "#000",
              borderRadius: "50%",
              height: "24px",
              width: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 0,
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            <CloseIcon sx={{ color: "#fff", fontSize: "16px" }} />
          </IconButton>
        </Box>
      ) : (
        <IconButton
          onClick={onClose}
          sx={{
            alignSelf: "flex-end",
            mr: "10px",
            my: "6px",
            backgroundColor: "#000",
            borderRadius: "50%",
            height: "24px",
            width: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 0,
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          <CloseIcon sx={{ color: "#fff", fontSize: "16px" }} />
        </IconButton>
      )}

      {isMobile && (
        <Box sx={{ pl: "16px", pr: "16px", pt: "10px", pb: "15px", backgroundColor: "#fff" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              lineHeight: "38px",
              fontSize: "32px",
            }}
          >
            {currentHelp.help_title}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          // gap: isMobile ? "0px" : "22px",
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
        <Box
          sx={{
            pl: isMobile ? "16px" : "32px",
            pr: isMobile ? "16px" : "24px",
            pb: isMobile ? "28px" : 0,
            pt: "10px",
            flex: isMobile ? "0 0 auto" : "0 0 327px",
            // 295 + 24 + 32
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
          }}
        >
          {!isMobile && (
            <Typography
              sx={{ fontWeight: 700, mb: "28px", color: "#333333", fontSize: "16px" }}
            >
              Help
            </Typography>
          )}
          {!isMobile && (
            <>
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
          
          <Box
  display="flex"
  flexDirection="column"
  justifyContent="space-between"
  height="100%"
>
  <Typography
    variant="body1"
    sx={{ fontWeight: 400, fontSize: "14px" }}
    dangerouslySetInnerHTML={{ __html: currentHelp.upper_description || "" }}
  />
  
  <Typography
    variant="body1"
    sx={{ fontWeight: 400, fontSize: "14px"}}
    dangerouslySetInnerHTML={{ __html: currentHelp.downer_description || "" }}
  />
</Box>

        </Box>

        <Box
          sx={{
            flex: 1,
            width: isMobile ? "100%" : "auto",
            backgroundColor: currentHelp.useColourSamples ? "transparent" : "#f4f4f4",
            borderTopLeftRadius: isMobile ? 0 : "20px",
            borderBottomLeftRadius: isMobile ? 0 : "20px",
            boxSizing: "border-box",
            maxHeight: isMobile ? "auto" : "545px",
            p: isMobile ? "0px" : "28px",
            py: currentHelp.useColourSamples ? "0px" : "28px",
            overflowY: isMobile ? "visible" : "auto",
            overflowX: isMobile ? "visible" : "auto",
            ...(!isMobile && {
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }),
          }}
        >
          {currentHelp.side_description && (
            <Typography
              sx={{
                fontSize: "12px",
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

          {currentHelp.useColourSamples && (
            <HelpColourSamples />
          )}

          {currentHelp.disclaimer && (
          <Box
            sx={{
              pt: "12px",
            }}
          >
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
      </Box>
    </Dialog>
  );
};

export default HelpModal;