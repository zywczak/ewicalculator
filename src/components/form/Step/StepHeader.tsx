import React, { ReactNode } from "react";
import { Box, Typography, Divider } from "@mui/material";
import HelpButton from "../buttons/helpButton";
import EwiproLogo from "../../../assets/EWI-Pro-Render-Systems.png";
import Slide from '@mui/material/Slide';
import address from "../../../api/adress";

interface StepHeaderProps {
  stepName: string | null;
  description?: string | ReactNode | null;
  stepIndex?: number;
  maxSteps?: number;
  helpAvailable: boolean;
  onHelpClick: () => void;
  isMobile?: boolean;
  selectedOptionImage?: string | null;
}

const StepHeader: React.FC<StepHeaderProps> = ({
  stepName,
  description,
  stepIndex,
  maxSteps,
  helpAvailable,
  onHelpClick,
  isMobile = false,
  selectedOptionImage,
}) => {
  return (
    <Box
      sx={{
        px: "24px",
        width: isMobile ? null : "260px",
        height: isMobile ? "auto" : "490px",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? undefined : "space-between",
          mt: isMobile ? "24px" : "64px",
        }}
      >
        <Box sx={{ height: "40px", pb: "4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: "#989898",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "19px",
            }}
          >
            {stepIndex ? `Step ${stepIndex}` : "Step"}
          </Typography>
          {isMobile ?
            <Typography
              sx={{
                color: "#989898",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "19px",
              }}
            >
              {maxSteps ? `/${maxSteps}` : "Step"}
            </Typography>
            : null
          }
        </Box>
        {helpAvailable && (
          <Box
            onClick={onHelpClick}
            sx={{
              height: "30px",
              width: "30px",
              mb: "4px",
              ml: isMobile ? "16px" : 0,
              borderRadius: "9999px",
              background: "#f5f5f5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >

            <Typography
              sx={{
                color: "#989898",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "19px",
              }}
            >
              ?
            </Typography>

          </Box>
        )}
        {isMobile ?
          <Box sx={{ marginLeft: 'auto' }}>
            <img
              src={EwiproLogo}
              alt="Ewipro Logo"
              style={{ height: "30px" }}
            />
          </Box>
          : null}
      </Box>

      <Divider sx={{ mb: 2, color: "#D0DBE0" }} />
      {isMobile ? null :
        <Typography
          sx={{
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: "38px",
          }}
          dangerouslySetInnerHTML={{ __html: stepName || "" }}
        />
      }
      {!isMobile && description && (
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 400,
            color: "#424242",
            mt: "24px",
          }}
          dangerouslySetInnerHTML={{ __html: description || "" }}
        />
      )}

      {!isMobile && selectedOptionImage && (
        <Box sx={{ position: 'absolute', left: 0, width: "280px", overflow: 'hidden', p: 0, m: 0 }}>
          <Slide
            direction="left"
            in={!!selectedOptionImage}
            key={selectedOptionImage}
            timeout={700}
            easing={{ enter: 'ease-in' }}
          >
            <Box sx={{ width: "220px", textAlign: 'center', mt: '24px', pl: '24px' }}>
              <img
                src={address + selectedOptionImage}
                alt="Selected option"
                style={{ width: '100%' }}
              />
            </Box>
          </Slide>
        </Box>
      )}

      {helpAvailable && !isMobile && (
        <Box sx={{ position: "absolute", bottom: "-16px", left: "24px" }}>
          <HelpButton helpAvailable={helpAvailable} onHelpClick={onHelpClick} />
        </Box>
      )}
    </Box>
  );
};

export default StepHeader;
