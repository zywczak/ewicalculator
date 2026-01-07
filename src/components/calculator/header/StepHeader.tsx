import React, { ReactNode } from "react";
import { Box, Typography, Divider } from "@mui/material";
import HelpButton from "../form/help/helpButton";
import EwiproLogo from "../../../assets/EWI-Pro-Render-Systems.png";
import Slide from '@mui/material/Slide';

const adress = "https://precious-choux-6bd82f.netlify.app"

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
        pl: "24px",
        width: isMobile ? null : "212px",
        height: isMobile ? "auto" : "490px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isMobile ? undefined : "space-between",
          mt: isMobile ? "24px" : "64px"
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
        <Box sx={{ width: "300px", overflow: 'hidden' }}>
          <Slide direction="left" in={!!selectedOptionImage} key={selectedOptionImage}>
            <Box sx={{ width: "212px", textAlign: 'center', mt: '24px' }}>
              <img
                src={adress +selectedOptionImage}
                alt="Selected option"
                style={{ width: '100%' }}
              />
            </Box>
          </Slide>
        </Box>
      )}

      {helpAvailable && !isMobile && (
        <Box sx={{ position: "absolute", bottom: "-16px", left: "34px" }}>
          <HelpButton helpAvailable={helpAvailable} onHelpClick={onHelpClick} />
        </Box>
      )}
    </Box>
  );
};

export default StepHeader;
