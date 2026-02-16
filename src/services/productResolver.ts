import { StepsData, ProductInfo } from "../data/steps/types";
import OPTION_IDS from "../data/constants/optionIds";

interface ProductMapping {
  [key: string]: ProductInfo | undefined;
}

export const getProductForStep = (
  stepId: number,
  selectedOptions: number[],
  stepsData: StepsData
): ProductInfo | undefined => {
  console.log(`[getProductForStep] Called for stepId: ${stepId}`);
  console.log('[getProductForStep] selectedOptions:', selectedOptions);
  
  const step = stepsData.steps.find(s => s.id === stepId);
  console.log(`[getProductForStep] Step found:`, step ? `Yes (id: ${step.id}, name: ${step.step_name})` : 'No');
  
  if (!step) {
    console.error(`[getProductForStep] Step ${stepId} not found in stepsData!`);
    return undefined;
  }
  
  console.log('[getProductForStep] Step options:', step.options);

  // For insulation material (step 5) - get products from selected thickness option in step 6
  if (stepId === 5) {
    const insulationType = selectedOptions.find(opt => 
      opt === OPTION_IDS.INSULATION.EPS || 
      opt === OPTION_IDS.INSULATION.WOOL || 
      opt === OPTION_IDS.INSULATION.KINGSPAN ||
      opt === OPTION_IDS.INSULATION.WOOD_FIBRE
    );
    
    const thicknessOpt = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.THICKNESS).includes(opt as any)
    );

    if (insulationType && thicknessOpt) {
      let materialType: 'eps' | 'wool' | 'kingspan' | 'wood_fibre' = 'eps';
      if (insulationType === OPTION_IDS.INSULATION.EPS) materialType = "eps";
      if (insulationType === OPTION_IDS.INSULATION.WOOL) materialType = "wool";
      if (insulationType === OPTION_IDS.INSULATION.KINGSPAN) materialType = "kingspan";
      if (insulationType === OPTION_IDS.INSULATION.WOOD_FIBRE) materialType = "wood_fibre";

      // Get product from thickness step option
      const thicknessStep = stepsData.steps.find(s => s.id === 6);
      if (thicknessStep?.options) {
        const selectedThicknessOption = thicknessStep.options.find(opt => opt.id === thicknessOpt);
        if (selectedThicknessOption?.products) {
          const product = selectedThicknessOption.products[materialType];
          return product || undefined;
        }
      }
    }
    return undefined;
  }

  // For mesh (step 5) - return mesh product from selected insulation type option
  if (stepId === 5) {
    const insulationOption = step.options?.find(opt => selectedOptions.includes(opt.id));
    return insulationOption?.products?.mesh || undefined;
  }

  // For surface material (step 2) - return product from selected surface option
  if (stepId === 2) {
    const surfaceOption = step.options?.find(opt => selectedOptions.includes(opt.id));
    return surfaceOption?.product || undefined;
  }

  // For fixings (step 7) - return product from selected fixing option
  if (stepId === 7) {
    console.log('[getProductForStep] Step 7 (Fixings) - selectedOptions:', selectedOptions);
    console.log('[getProductForStep] Step options:', step.options);
    
    const fixingOption = step.options?.find(opt => selectedOptions.includes(opt.id));
    console.log('[getProductForStep] Selected fixing option:', fixingOption);
    
    // If no fixing type selected, determine default based on insulation type
    if (!fixingOption) {
      const insulationType = selectedOptions.find(opt => 
        opt === OPTION_IDS.INSULATION.EPS || 
        opt === OPTION_IDS.INSULATION.WOOL || 
        opt === OPTION_IDS.INSULATION.KINGSPAN ||
        opt === OPTION_IDS.INSULATION.WOOD_FIBRE
      );
      
      console.log('[getProductForStep] No fixing selected, insulation type:', insulationType);
      
      // Select default fixing based on insulation type and parent_option_id
      const defaultFixingOption = step.options?.find(opt => {
        if (insulationType === OPTION_IDS.INSULATION.EPS) {
          return opt.id === OPTION_IDS.FIXINGS.METAL; // Default for EPS: metal (36)
        } else if (insulationType === OPTION_IDS.INSULATION.WOOL) {
          return opt.id === OPTION_IDS.FIXINGS.METAL; // Default for WOOL: metal (36)
        } else if (insulationType === OPTION_IDS.INSULATION.KINGSPAN) {
          return opt.id === OPTION_IDS.FIXINGS.SCREW_METAL; // Default for KINGSPAN: screw metal (60)
        } else if (insulationType === OPTION_IDS.INSULATION.WOOD_FIBRE) {
          return opt.id === OPTION_IDS.FIXINGS.SCREW_METAL; // Default for WOOD_FIBRE: screw metal (60)
        }
        return false;
      });
      
      console.log('[getProductForStep] Default fixing option:', defaultFixingOption);
      console.log('[getProductForStep] Returning product:', defaultFixingOption?.product);
      
      return defaultFixingOption?.product || undefined;
    }
    
    console.log('[getProductForStep] Returning selected product:', fixingOption?.product);
    return fixingOption?.product || undefined;
  }

  // For colour selection (step 11) - return product from selected colour option (brick slips only)
  if (stepId === 11) {
    const colourOption = step.options?.find(opt => selectedOptions.includes(opt.id));
    return colourOption?.product || undefined;
  }

  // Check step-level products
  if (!step.products) return undefined;
  const products = step.products;

  // Check for default product
  if (products.default) {
    return products.default;
  }

  // For render (step 9) - depends on render type + grain size
  if (stepId === 9) {
    const renderType = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.RENDER_TYPE).includes(opt as any)
    );
    
    const grainSize = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.GRAINSIZE).includes(opt as any)
    );

    if (renderType && grainSize) {
      let renderName = "";
      if (renderType === OPTION_IDS.RENDER_TYPE.NANO_DREX) renderName = "nano-drex";
      if (renderType === OPTION_IDS.RENDER_TYPE.PREMIUM_BIO) renderName = "premium-bio";
      if (renderType === OPTION_IDS.RENDER_TYPE.SILICONE) renderName = "silicone";
      if (renderType === OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE) renderName = "silicone-silicate";

      // Get grain size value
      let grainValue = "";
      if (grainSize === OPTION_IDS.GRAINSIZE["0_5MM"]) grainValue = "0.5";
      if (grainSize === OPTION_IDS.GRAINSIZE["1MM"]) grainValue = "1";
      if (grainSize === OPTION_IDS.GRAINSIZE["1_5MM"]) grainValue = "1.5";
      if (grainSize === OPTION_IDS.GRAINSIZE["2MM"]) grainValue = "2";
      if (grainSize === OPTION_IDS.GRAINSIZE["3MM"]) grainValue = "3";

      const key = `${renderName}-${grainValue}`;
      return products[key];
    }
  }

  return undefined;
};

// Get adhesive product from step 5 (insulation type) or step 4 (render only)
export const getAdhesiveProduct = (
  selectedOptions: number[],
  stepsData: StepsData
): ProductInfo | undefined => {
  // Check if it's Render Only system
  const isRenderOnly = selectedOptions.includes(OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY);
  
  if (isRenderOnly) {
    // For Render Only, get adhesive from step 4 (system type)
    const step4 = stepsData.steps.find(s => s.id === 4);
    if (!step4) return undefined;
    
    const renderOnlyOption = step4.options?.find(opt => opt.id === OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY);
    return renderOnlyOption?.products?.adhesive || undefined;
  }
  
  // For Insulation & Render, get adhesive from step 5 (insulation type)
  const insulationType = selectedOptions.find(opt => 
    opt === OPTION_IDS.INSULATION.EPS || 
    opt === OPTION_IDS.INSULATION.WOOL || 
    opt === OPTION_IDS.INSULATION.KINGSPAN
  );
  
  if (!insulationType) return undefined;
  
  const step5 = stepsData.steps.find(s => s.id === 5);
  if (!step5) return undefined;
  
  // Find insulation option and return its adhesive product
  const insulationOption = step5.options?.find(opt => opt.id === insulationType);
  return insulationOption?.products?.adhesive || undefined;
};

// Get mesh product from step 5 (insulation type) or step 4 (render only)
export const getMeshProduct = (
  selectedOptions: number[],
  stepsData: StepsData
): ProductInfo | undefined => {
  // Check if it's Render Only system
  const isRenderOnly = selectedOptions.includes(OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY);
  
  if (isRenderOnly) {
    // For Render Only, get mesh from step 4 (system type)
    const step4 = stepsData.steps.find(s => s.id === 4);
    if (!step4) return undefined;
    
    const renderOnlyOption = step4.options?.find(opt => opt.id === OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY);
    return renderOnlyOption?.products?.mesh || undefined;
  }
  
  // For Insulation & Render, get mesh from step 5 (insulation type)
  const insulationType = selectedOptions.find(opt => 
    opt === OPTION_IDS.INSULATION.EPS || 
    opt === OPTION_IDS.INSULATION.WOOL || 
    opt === OPTION_IDS.INSULATION.KINGSPAN
  );
  
  if (!insulationType) return undefined;
  
  const step5 = stepsData.steps.find(s => s.id === 5);
  if (!step5) return undefined;
  
  // Find insulation option and return its mesh product
  const insulationOption = step5.options?.find(opt => opt.id === insulationType);
  return insulationOption?.products?.mesh || undefined;
};

// Get brick slips adhesive product from step 9 (render type selection)
export const getBrickSlipsAdhesive = (
  selectedOptions: number[],
  stepsData: StepsData
): ProductInfo | undefined => {
  const isBrickSlips = selectedOptions.includes(OPTION_IDS.RENDER_TYPE.BRICK_SLIPS);
  if (!isBrickSlips) return undefined;
  
  const step = stepsData.steps.find(s => s.id === 9);
  if (!step) return undefined;
  
  // Find brick slips option and return its product (adhesive)
  const brickSlipsOption = step.options?.find(opt => opt.id === OPTION_IDS.RENDER_TYPE.BRICK_SLIPS);
  return brickSlipsOption?.product || undefined;
};

export const getAllProducts = (
  selectedOptions: number[],
  stepsData: StepsData
): ProductMapping => {
  const mapping: ProductMapping = {};

  // Get all steps with products
  const stepsWithProducts = stepsData.steps.filter(step => step.products);

  stepsWithProducts.forEach(step => {
    const product = getProductForStep(step.id, selectedOptions, stepsData);
    if (product) {
      mapping[step.json_key] = product;
    }
  });

  return mapping;
};
