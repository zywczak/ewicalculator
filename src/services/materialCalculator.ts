import OPTION_IDS from "../data/constants/optionIds";
import { CALC_VALUES } from "./calculationConstants";

export interface CalculatedMaterials {
  insulation_material_units: number;
  adhesive_units: number;
  mesh_units: number;
  fixings_units: number;
  primer_units: number;
  render_units: number;
  brick_slips_units?: number;
  brick_slips_adhesive_units?: number;
  paint_units?: number;
  corner_beads?: number;
  stop_beads?: number;
  bellcast_beads?: number;
  window_reveal?: number;
  starter_tracks?: number;
  levelling_coat?: number;
  fungicidal_wash?: number;
  blue_film?: number;
  orange_tape?: number;
}

interface CalculatorInputs {
  surfaceArea: number;
  systemType: number; // OPTION_IDS.SYSTEM_TYPE
  insulationType?: number; // OPTION_IDS.INSULATION
  thickness?: number;
  renderType?: number; // OPTION_IDS.RENDER_TYPE
  grainSize?: number; // OPTION_IDS.GRAINSIZE
  fixingsType?: number; // OPTION_IDS.FIXINGS
  selectedOptions: number[];
  values: Record<number, string | number>;
}

export const calculateMaterials = (inputs: CalculatorInputs): CalculatedMaterials => {
  const { surfaceArea, systemType, insulationType, thickness, grainSize, values } = inputs;
  
  const isRenderOnly = systemType === OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY;
  const isInsulationAndRender = systemType === OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER;
  
  // Initialize result
  const result: CalculatedMaterials = {
    insulation_material_units: 0,
    adhesive_units: 0,
    mesh_units: 0,
    fixings_units: 0,
    primer_units: 0,
    render_units: 0,
    brick_slips_units: 0,
    brick_slips_adhesive_units: 0
  };

  if (surfaceArea <= 0) return result;

  // ===== INSULATION MATERIAL =====
  if (isInsulationAndRender && insulationType) {
    if (insulationType === OPTION_IDS.INSULATION.WOOL) {
      // Wool calculation based on thickness
      switch (thickness) {
        case 50:
          result.insulation_material_units = Math.ceil(surfaceArea / CALC_VALUES.wool2);
          break;
        case 70:
          result.insulation_material_units = Math.ceil(surfaceArea / CALC_VALUES.wool3);
          break;
        case 90:
        case 100:
        case 110:
        case 120:
          result.insulation_material_units = Math.ceil(surfaceArea / CALC_VALUES.wool);
          break;
        case 140:
        case 150:
          result.insulation_material_units = Math.ceil(surfaceArea / CALC_VALUES.wool4);
          break;
        default:
          result.insulation_material_units = Math.ceil(surfaceArea / CALC_VALUES.wool);
      }
    } else if (insulationType === OPTION_IDS.INSULATION.KINGSPAN) {
      result.insulation_material_units = Math.ceil(surfaceArea / CALC_VALUES.kingspan);
    } else {
      // EPS - direct sqm
      result.insulation_material_units = Math.ceil(surfaceArea);
    }
  }

  // ===== ADHESIVE =====
  result.adhesive_units = Math.ceil(
    surfaceArea / (isRenderOnly ? CALC_VALUES.adhesive_ro : CALC_VALUES.adhesive)
  );

  // ===== MESH =====
  result.mesh_units = Math.ceil((surfaceArea * 1.1) / CALC_VALUES.mesh);

  // ===== FIXINGS =====
  // Skip fixings if thickness <= 20mm or render only
  if (isInsulationAndRender && thickness && thickness > 20) {
    result.fixings_units = Math.ceil(surfaceArea / CALC_VALUES.fixings);
  } else {
    result.fixings_units = 0;
  }

  // ===== PRIMER =====
  result.primer_units = Math.ceil(surfaceArea / CALC_VALUES.primer);

  // ===== RENDER / BRICK SLIPS =====
  const isBrickSlips = inputs.renderType === OPTION_IDS.RENDER_TYPE.BRICK_SLIPS;
  
  if (isBrickSlips) {
    // Brick slips: 1 bag per sqm
    result.brick_slips_units = Math.ceil(surfaceArea / CALC_VALUES.brick_slips);
    // Brick slips adhesive: 1 bucket per 6 sqm
    result.brick_slips_adhesive_units = Math.ceil(surfaceArea / CALC_VALUES.brick_slips_adhesive);
    result.render_units = 0;
  } else {
    // Regular render
    const grainSizeValue = getGrainSizeValue(grainSize);
    result.render_units = Math.ceil(surfaceArea / CALC_VALUES.render[grainSizeValue]);
    result.brick_slips_units = 0;
    result.brick_slips_adhesive_units = 0;
  }

  // ===== PAINT =====
  // Paint is calculated separately if needed based on render type
  // Note: Mineral render type removed as it doesn't exist in current OPTION_IDS

  // ===== BEADS & TRIMS =====
  // Get values from form (step 8 substeps)
  if (values[19]) result.corner_beads = Number(values[19]) || 0;
  if (values[20]) result.stop_beads = Number(values[20]) || 0;
  if (values[21]) result.bellcast_beads = Number(values[21]) || 0;
  if (values[22]) result.window_reveal = Number(values[22]) || 0;
  
  // Starter tracks (from nested substep)
  if (values[18]) result.starter_tracks = Number(values[18]) || 0;
  if (values[32]) result.starter_tracks = Number(values[32]) || 0;

  // ===== ADDITIONAL PRODUCTS =====
  if (values[27]) result.levelling_coat = Number(values[27]) || 0;
  if (values[28]) result.fungicidal_wash = Number(values[28]) || 0;
  if (values[29]) result.blue_film = Number(values[29]) || 0;
  if (values[30]) result.orange_tape = Number(values[30]) || 0;

  return result;
};

// Helper to convert grain size option ID to value
const getGrainSizeValue = (grainSizeId?: number): "0.5" | "1" | "1.5" | "2" | "3" => {
  if (!grainSizeId) return "1.5";
  
  switch (grainSizeId) {
    case OPTION_IDS.GRAINSIZE["0_5MM"]:
      return "0.5";
    case OPTION_IDS.GRAINSIZE["1MM"]:
      return "1";
    case OPTION_IDS.GRAINSIZE["1_5MM"]:
      return "1.5";
    case OPTION_IDS.GRAINSIZE["2MM"]:
      return "2";
    case OPTION_IDS.GRAINSIZE["3MM"]:
      return "3";
    default:
      return "1.5";
  }
};

// Helper to get selected option ID for a step
export const getSelectedOption = (stepId: number, selectedOptions: number[]): number | undefined => {
  // Placeholder - enhance based on your needs
  return selectedOptions[0];
};
