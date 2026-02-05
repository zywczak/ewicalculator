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
  const step = stepsData.steps.find(s => s.id === stepId);
  if (!step) return undefined;

  // For insulation material (step 5) - get products from selected thickness option in step 6
  if (stepId === 5) {
    const insulationType = selectedOptions.find(opt => 
      opt === OPTION_IDS.INSULATION.EPS || 
      opt === OPTION_IDS.INSULATION.WOOL || 
      opt === OPTION_IDS.INSULATION.KINGSPAN
    );
    
    const thicknessOpt = selectedOptions.find(opt => 
      Object.values(OPTION_IDS.THICKNESS).includes(opt as any)
    );

    if (insulationType && thicknessOpt) {
      let materialType: 'eps' | 'wool' | 'kingspan' = 'eps';
      if (insulationType === OPTION_IDS.INSULATION.EPS) materialType = "eps";
      if (insulationType === OPTION_IDS.INSULATION.WOOL) materialType = "wool";
      if (insulationType === OPTION_IDS.INSULATION.KINGSPAN) materialType = "kingspan";

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

  // For mesh (step 6) - return mesh product from products
  if (stepId === 6) {
    if (step.products?.mesh) {
      return step.products.mesh;
    }
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

  // For fixings (step 7) - depends on plastic/metal choice
  if (stepId === 7) {
    const fixingType = selectedOptions.find(opt => 
      opt === OPTION_IDS.FIXINGS.PLASTIC || 
      opt === OPTION_IDS.FIXINGS.METAL
    );

    if (fixingType) {
      const key = fixingType === OPTION_IDS.FIXINGS.PLASTIC ? "plastic" : "metal";
      return products[key];
    }
  }

  // For colour selection (step 11) - return product from selected colour option (brick slips only)
  if (stepId === 11) {
    const colourOption = step.options?.find(opt => selectedOptions.includes(opt.id));
    return colourOption?.product || undefined;
  }

  return undefined;
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
