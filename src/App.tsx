import React, { useState } from 'react';
import { Button } from '@mui/material';
import HousePreview from './components/HousePreview';
import { CustomHouseImage } from './data/images/types';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [selectedOptions, ] = useState<number[]>([]);
  const isMobile = window.innerWidth <= 768;
  const stepsData = {
    steps: [
      // ...your steps data
    ],
  };

  const handleHouseImageChange = (imageData: CustomHouseImage | null) => {
    // Handle image change
    console.log('House image changed:', imageData);
  };

  const handleCustomImageSelected = () => {
    // Your logic for handling custom image selection
    console.log('Custom image selected');
  };

  const handleNext = () => {
    if (isGeneratingImage) {
      console.log('Cannot proceed - image is generating');
      return; // Block if generating
    }

    if (currentStep < stepsData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const canProceed = true; // Your logic to determine if we can proceed

  return (
    <div>
      <HousePreview
        selectedOptions={selectedOptions}
        isMobile={isMobile}
        onHouseImageChange={handleHouseImageChange}
        onCustomImageSelected={handleCustomImageSelected}
        currentStep={currentStep}
        stepsData={stepsData}
        onGeneratingChange={setIsGeneratingImage}
      />
      <Button
        variant="contained"
        onClick={handleNext}
        disabled={
          !canProceed ||
          currentStep >= stepsData.steps.length - 1 ||
          isGeneratingImage
        }
        sx={{ minWidth: "120px" }}
      >
        {isGeneratingImage ? 'Generowanie...' : 'Dalej'}
      </Button>
    </div>
  );
}

export default App;