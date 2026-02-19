import { products } from "../data/products";
import { FormStep, StepsData } from "../data/steps/types";

export interface CalculatedMaterials {
  [key: string]: any;
}

interface CalculateMaterialsParams {
  selectedOptions: number[];
  values: Record<number, string | number>;
  stepsData: StepsData;
}

const roundUp = (value: number) => Math.ceil(value);

// ── Substep helpers ───────────────────────────────────────────────────────────

function collectNumberSubsteps(steps: FormStep[]): FormStep[] {
  const result: FormStep[] = [];
  for (const step of steps) {
    if (step.input_type === "number" && step.productCode && step.productCode.length > 0) {
      result.push(step);
    }
    if (step.substeps?.length) {
      result.push(...collectNumberSubsteps(step.substeps));
    }
  }
  return result;
}

function stepConditionsSkip(substepId: number, selectedOptions: number[], step: any): boolean {
  return step.conditions?.some(
    (cond: any) => cond.skip_steps.includes(substepId) && selectedOptions.includes(cond.trigger_option)
  ) ?? false;
}

function isSubstepSkippedInSubsteps(substepId: number, selectedOptions: number[], substeps: FormStep[]): boolean {
  for (const sub of substeps) {
    if (stepConditionsSkip(substepId, selectedOptions, sub)) return true;
    if (sub.substeps?.length && isSubstepSkippedInSubsteps(substepId, selectedOptions, sub.substeps)) return true;
  }
  return false;
}

function isSubstepSkipped(substepId: number, selectedOptions: number[], stepsData: StepsData): boolean {
  for (const step of stepsData.steps) {
    if (stepConditionsSkip(substepId, selectedOptions, step)) return true;
    if (step.substeps?.length && isSubstepSkippedInSubsteps(substepId, selectedOptions, step.substeps)) return true;
  }
  return false;
}

// ── Product/material helpers ──────────────────────────────────────────────────

function addProductToMaterials(
  materials: CalculatedMaterials,
  productCode: string,
  inputValue: number
): void {
  const product = products.find(p => p.productCode === productCode);
  if (!product || inputValue <= 0) return;

  const categoryKey = (product as any).category.replaceAll('-', '_');
  let quantity: number;

  if ('coverage' in product && typeof (product as any).coverage === 'number') {
    quantity = roundUp(inputValue / (product as any).coverage);
  } else {
    quantity = inputValue;
  }

  if (quantity > 0) {
    materials[categoryKey] = product.productCode;
    materials[`${categoryKey}_units`] = quantity;
  }
}

function getThicknessSuffix(thickness: number): string {
  return thickness < 100 ? String(thickness).padStart(3, '0') : String(thickness);
}

function resolveInsulationThickness(stepsData: StepsData, selectedOptions: number[]): number | undefined {
  const thicknessStep = stepsData.steps.find(s => s.id === 6);
  const thicknessOptId = selectedOptions.find(opt => thicknessStep?.options?.some(o => o.id === opt));
  return thicknessStep?.options?.find(o => o.id === thicknessOptId)?.json_value as number | undefined;
}

// ── Variant resolvers ─────────────────────────────────────────────────────────

function resolveThicknessVariant(
  variants: any[], selectedOptions: number[], stepsData: StepsData, surfaceArea: number
): { quantity: number; productCodeSuffix: string | null } {
  const thickness = resolveInsulationThickness(stepsData, selectedOptions);
  const variant = thickness ? variants.find(v => v.thickness === thickness) : variants[0];
  const quantity = variant?.coverage ? roundUp(surfaceArea / variant.coverage) : 0;
  const suffix = thickness ? getThicknessSuffix(thickness) : null;
  return { quantity, productCodeSuffix: suffix };
}

function resolveGrainVariant(
  variants: any[], selectedOptions: number[], stepsData: StepsData, surfaceArea: number
): { quantity: number; productCodeSuffix: string | null } {
  const grainStep = stepsData.steps.find(s => s.id === 10);
  const grainOptId = selectedOptions.find(opt => grainStep?.options?.some(o => o.id === opt));
  const grainSize = grainStep?.options?.find(o => o.id === grainOptId)?.json_value as number;
  const variant = grainSize
    ? variants.find(v => v.grainSize === grainSize)
    : (variants.find(v => v.grainSize === 1.5) ?? variants[0]);
  const quantity = variant?.coverage ? roundUp(surfaceArea / variant.coverage) : 0;
  return { quantity, productCodeSuffix: grainSize ? `${grainSize}A` : null };
}

function resolveUsageVariant(
  variants: any[], selectedOptions: number[], stepsData: StepsData, surfaceArea: number
): { quantity: number; productCodeSuffix: string | null } {
  const systemStep = stepsData.steps.find(s => s.id === 4);
  const systemOptId = selectedOptions.find(opt => systemStep?.options?.some(o => o.id === opt));
  // RENDER_ONLY option id = 5, INSULATION_AND_RENDER = 4
  const usage = systemOptId === 5 ? 'render_only' : 'insulation_system';
  const variant = variants.find(v => v.usage === usage) ?? variants[0];
  const quantity = variant?.coverage ? roundUp(surfaceArea / variant.coverage) : 0;
  return { quantity, productCodeSuffix: null };
}

function resolveVariantProduct(
  product: any, selectedOptions: number[], stepsData: StepsData, surfaceArea: number
): { quantity: number; productCode: string } {
  const variants = product.variants as any[];
  const firstVariant = variants[0];
  let result: { quantity: number; productCodeSuffix: string | null };

  if ('thickness' in firstVariant) result = resolveThicknessVariant(variants, selectedOptions, stepsData, surfaceArea);
  else if ('grainSize' in firstVariant) result = resolveGrainVariant(variants, selectedOptions, stepsData, surfaceArea);
  else result = resolveUsageVariant(variants, selectedOptions, stepsData, surfaceArea);

  let productCode: string;
  if (!result.productCodeSuffix) {
    productCode = product.productCode;
  } else if (product.productCode === 'SPI-EWIPLUS') {
    productCode = `${product.productCode}${String(Number(result.productCodeSuffix))}`;
  } else {
    productCode = `${product.productCode}-${result.productCodeSuffix}`;
  }
  return { quantity: result.quantity, productCode };
}

// ── Category processors ───────────────────────────────────────────────────────

function processSingleProduct(
  product: any, categoryKey: string, selectedOptions: number[], stepsData: StepsData,
  surfaceArea: number, materials: CalculatedMaterials
): void {
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const hasCoverage = typeof product.coverage === 'number';

  let productCode = product.productCode;
  let quantity = hasCoverage ? roundUp(surfaceArea / product.coverage) : 0;

  if (!hasVariants && categoryKey === 'insulation') {
    const thickness = resolveInsulationThickness(stepsData, selectedOptions);
    if (thickness) {
      productCode = product.productCode === 'SPI-EWIPLUS'
        ? `${productCode}${String(thickness)}`
        : `${productCode}-${getThicknessSuffix(thickness)}`;
    }
  }

  if (hasVariants) {
    const resolved = resolveVariantProduct(product, selectedOptions, stepsData, surfaceArea);
    productCode = resolved.productCode;
    quantity = resolved.quantity;
  }

  if (quantity > 0) {
    materials[categoryKey] = productCode;
    materials[`${categoryKey}_units`] = quantity;
  }
}

function processSizeVariantCategory(
  categoryProducts: any[], categoryKey: string, surfaceArea: number, materials: CalculatedMaterials
): void {
  const sorted = [...categoryProducts]
    .filter(p => typeof p.coverage === 'number')
    .sort((a, b) => b.coverage - a.coverage);

  let remaining = surfaceArea;
  sorted.forEach((product, i) => {
    const qty = i === sorted.length - 1
      ? Math.ceil(remaining / product.coverage)
      : Math.floor(remaining / product.coverage);
    remaining -= qty * product.coverage;
    if (qty > 0) {
      const suffix = product.productCode.split('-').pop();
      const key = `${categoryKey}_${suffix}`;
      materials[key] = product.productCode;
      materials[`${key}_units`] = qty;
    }
  });
}

function processCategoryProducts(
  categoryProducts: any[], categoryKey: string, selectedOptions: number[],
  stepsData: StepsData, surfaceArea: number, materials: CalculatedMaterials
): void {
  const isSizeVariant = categoryProducts.length > 1 && !categoryProducts.some(p => 'avaliable_lenght' in p);

  if (isSizeVariant) {
    processSizeVariantCategory(categoryProducts, categoryKey, surfaceArea, materials);
    return;
  }

  categoryProducts.forEach(product =>
    processSingleProduct(product, categoryKey, selectedOptions, stepsData, surfaceArea, materials)
  );
}

// ── Fixings ───────────────────────────────────────────────────────────────────

function processFixings(
  option: any, selectedOptions: number[], stepsData: StepsData,
  surfaceArea: number, materials: CalculatedMaterials
): void {
  const insulationOptionIds = stepsData.steps.find(s => s.id === 5)?.options?.map(o => o.id) ?? [];
  const selectedInsulationOptId = selectedOptions.find(opt => insulationOptionIds.includes(opt));
  const selectedInsulationOpt = stepsData.steps
    .find(s => s.id === 5)
    ?.options?.find(o => o.id === selectedInsulationOptId);

  const thickness = resolveInsulationThickness(stepsData, selectedOptions);
  if (!selectedInsulationOpt || !thickness) return;

  // EPS needs extra 20mm of fixing into wall compared to others
  const isEPS = selectedInsulationOpt.json_value === 'EPS';
  const requiredLength = isEPS ? thickness + 65 : thickness + 45;

  const fixingProducts = option.productCode
    .map((code: string) => products.find(p => p.productCode === code))
    .filter((p: any): p is any => p !== undefined && 'avaliable_lenght' in p);

  let bestProduct: any = null;
  let bestLength = Infinity;

  fixingProducts.forEach((product: any) => {
    const sorted = [...(product.avaliable_lenght as number[])].sort((a, b) => a - b);
    const suitable = sorted.find(l => l >= requiredLength);
    if (suitable && suitable < bestLength) {
      bestLength = suitable;
      bestProduct = product;
    }
  });

  if (bestProduct) {
    const quantity = roundUp((surfaceArea * bestProduct.unitPerSqm) / bestProduct.unitInPack);
    materials.fixings = `${bestProduct.productCode}-${bestLength}`;
    materials.fixings_units = quantity;
  }
}

// ── Main export ───────────────────────────────────────────────────────────────

export function calculateMaterials(params: CalculateMaterialsParams): CalculatedMaterials {
  const { selectedOptions, values, stepsData } = params;

  const materials: CalculatedMaterials = {};
  const surfaceArea = Number(values[3]) || 0;

  selectedOptions.forEach(optionId => {
    const step = stepsData.steps.find(s => s.options?.some(opt => opt.id === optionId));
    if (!step) return;

    const option = step.options?.find(opt => opt.id === optionId);
    if (!option?.productCode?.length) return;

    if (step.id === 7) {
      processFixings(option, selectedOptions, stepsData, surfaceArea, materials);
      return;
    }

    const productsByCategory = new Map<string, any[]>();
    option.productCode.forEach((code: string) => {
      const product = products.find(p => p.productCode === code);
      if (product) {
        const cat = (product as any).category.replaceAll('-', '_');
        if (!productsByCategory.has(cat)) productsByCategory.set(cat, []);
        productsByCategory.get(cat)!.push(product);
      }
    });

    productsByCategory.forEach((categoryProducts, categoryKey) =>
      processCategoryProducts(categoryProducts, categoryKey, selectedOptions, stepsData, surfaceArea, materials)
    );
  });

  const allNumberSubsteps = collectNumberSubsteps(stepsData.steps);

  allNumberSubsteps.forEach(substep => {
    if (isSubstepSkipped(substep.id, selectedOptions, stepsData)) return;
    const inputValue = Number(values[substep.id]) || 0;
    if (inputValue <= 0) return;
    substep.productCode!.forEach(code => addProductToMaterials(materials, code, inputValue));
  });

  return materials;
}