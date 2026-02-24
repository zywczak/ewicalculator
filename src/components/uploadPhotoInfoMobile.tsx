import React, { useEffect, useRef, useState } from 'react';
import { Typography, Box, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const DESIGN_WIDTH = 700; // ← szerokość projektowa
const DESIGN_HEIGHT = 700;

const HelpOverlay = styled(Box)({
  position: 'absolute',
  inset: 0,  
  top: 0,
  left: 0,
  width: DESIGN_WIDTH, // 👈 stała szerokość projektu
  height: DESIGN_HEIGHT,
  zIndex: 200,
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  backgroundColor: 'rgba(255,255,255,0.37)',
  transformOrigin: 'top left', // KLUCZOWE
});

const GlassBubble = styled(Paper)({
  backgroundColor: '#D9D9D9',
  borderRadius: '20px',
  padding: '10px 16px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  width: '450px',
  maxWidth: '90%',
});

const StepNumber = styled(Typography)({
  fontWeight: 700,
  fontSize: '18px',
});

const StepText = styled(Typography)({
  fontSize: '18px',
  lineHeight: 1.5,
  color: '#333',
});

interface Props {
  readonly onClose: () => void;
}

export default function PhotoUploadInfoMobile({ onClose }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!wrapperRef.current) return;

      const parentWidth =
        wrapperRef.current.parentElement?.offsetWidth ?? DESIGN_WIDTH;

      setScale(parentWidth / DESIGN_WIDTH);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    if (wrapperRef.current?.parentElement) {
      resizeObserver.observe(wrapperRef.current.parentElement);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Box
      ref={wrapperRef}
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <HelpOverlay
        sx={{
          transform: `scale(${scale})`,
        }}
      >
        <Box
          sx={{
            backgroundColor: '#D9D9D9',
            borderRadius: '20px',
            padding: '10px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            width: '250px',
            pointerEvents: 'auto',
          }}
        >
            <Typography sx={{ fontWeight: 400, fontSize: '20px' }}>
                See more.
            </Typography>
            <Typography sx={{ fontWeight: 700, lineHeight: 1, fontSize: '20px' }}>
                Upload a photo of your home.
            </Typography>
        </Box>

        {[
          "Use a photo taken from the front of the property so the outline of the house is clearly visible. Use UPLOAD button to upload proper photo.",
          "If your house is not detached. In the next step, after photo upload, mark the area that shows your home and ACCEPT.",
          "Start changing colours and see how you can transform your home with EWI Pro.",
        ].map((text, index) => (
          <GlassBubble key={text}>
            <StepNumber>{index + 1}.</StepNumber>
            <StepText>{text}</StepText>
          </GlassBubble>
        ))}
      </HelpOverlay>

      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'white',
          pointerEvents: 'auto',
          zIndex: 201,
          '&:hover': { backgroundColor: '#f0f0f0' },
        }}
        size="small"
      >
        <CloseIcon fontSize="small" sx={{ color: '#000' }} />
      </IconButton>
    </Box>
  );
}