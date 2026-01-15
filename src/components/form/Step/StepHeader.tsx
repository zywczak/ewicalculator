import React, { ReactNode } from "react";//, useState
import { Box, Typography, Divider } from "@mui/material";//, Popover
import HelpButton from "../buttons/helpButton";
import EwiproLogo from "../../../assets/EWI-Pro-Render-Systems.png";
import Slide from '@mui/material/Slide';
import address from "../../../api/adress";
//import LightbulbIcon from '@mui/icons-material/Lightbulb';

interface StepHeaderProps {
  stepName: string | null;
  description?: string | ReactNode | null;
  stepIndex?: number;
  maxSteps?: number;
  helpAvailable: boolean;
  onHelpClick: () => void;
  isMobile?: boolean;
  selectedOptionImage?: string | null;
  // aiHint?: string;
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
  // aiHint = "",
}) => {
  // const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // const handleBulbClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handlePopoverClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const hasHint = aiHint.length > 0;
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
        {/* <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Box
            onClick={handleBulbClick}
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
              cursor: hasHint ? "pointer" : "default",
              transition: "background 0.3s ease",
              "&:hover": {
                backgroundColor: hasHint ? "#8B959A" : "#f5f5f5",
              },
            }}
          >
            <svg width="0" height="0">
              <defs>
                <linearGradient id="bulbGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="30%" stopColor="#000000" />
                  <stop offset="30%" stopColor="#FFC107" />
                  <stop offset="100%" stopColor="#FFC107" />
                </linearGradient>
              </defs>
            </svg>
            <LightbulbIcon
              sx={{
                fontSize: 19,
                ...(hasHint
                  ? { fill: 'url(#bulbGradient)' }
                  : { color: '#BDBDBD' }),
              }}
            />
          </Box> */}
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
        {/* </Box> */}
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

      {/* <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          mt: 1,
        }}
      >
        <Box sx={{ p: 2, maxWidth: 300 }}>
          <Typography sx={{ fontSize: "12px", color: "#424242" }}>
            {aiHint}
          </Typography>
        </Box>
      </Popover> */}

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
            <Box sx={{ width: "236px", textAlign: 'center', mt: '24px', pl: '24px' }}>
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
