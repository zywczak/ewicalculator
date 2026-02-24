import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const InfoContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  borderRadius: '40px',
  padding: theme.spacing(6),
  boxShadow: 'none',
  fontFamily: 'sans-serif',
}));


export default function PhotoUploadInfo() {
  return (
    <InfoContainer sx={{ ml: "16px", mr: "62px", py: "16px" }}>
      <Grid container spacing={8} alignItems="flex-start" >
        
        <Grid size={ 2.5 } my={"auto"}>
          <Typography sx={{ fontWeight: 400, fontSize: '20px' }}>
            See more.
          </Typography>
          <Typography sx={{ fontWeight: 700, lineHeight: 1, fontSize: '20px' }}>
            Upload a photo of your home.
          </Typography>
        </Grid>

        {/* Krok 1 */}
        <Grid size={ 3 }>
          <Typography sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.1 }}>1.</Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>
            Use a photo taken from the front of the property so the outline of the house is 
            clearly visible. Use UPLOAD button to upload proper photo.
          </Typography>
        </Grid>

        {/* Krok 2 */}
        <Grid size={ 3 }>
          <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>2.</Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>
            If your house is not detached. In the next step, after photo upload, mark the area that shows your home and ACCEPT. 
            And it&apos;s done...
          </Typography>
        </Grid>

        {/* Krok 3 */}
        <Grid size={ 3 }>
          <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>3.</Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>
            Start changing colours and see how you can transform your home with EWI Pro.
          </Typography>
        </Grid>

      </Grid>
    </InfoContainer>
  );
}