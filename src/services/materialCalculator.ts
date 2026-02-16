import OPTION_IDS from "../data/constants/optionIds";
import { CALC_VALUES } from "./calculationConstants";

export interface CalculatedMaterials {
  insulation_material_units: number;
  adhesive_units: number;
  mesh_units: number;
  fixings_units: number;
  primer_20_units: number;
  primer_7_units: number;
  primer_310_units: number;
  render_units: number;
  brick_slips_units?: number;
  brick_slips_adhesive_units?: number;
  paint_units?: number;
  corner_beads?: number;
  stop_beads?: number;
  bellcast_beads?: number;
  window_reveal?: number;
  starter_tracks?: number;
  corner_brick_slips?: number;
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
  surfaceMaterial?: number; // OPTION_IDS.SURFACE
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
    primer_20_units: 0,
    primer_7_units: 0,
    primer_310_units: 0,
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
          result.insulation_material_units = Math.ceil(surfaceArea / CALC_VALUES.wool4);
          break;
        case 140:
          result.insulation_material_units = Math.ceil(surfaceArea / CALC_VALUES.wool5);
          break;
        case 150:
          result.insulation_material_units = Math.ceil(surfaceArea / CALC_VALUES.wool6);
          break;
      }
    } else if (insulationType === OPTION_IDS.INSULATION.KINGSPAN) {
      result.insulation_material_units = Math.ceil(surfaceArea / CALC_VALUES.kingspan);
    } else if (insulationType === OPTION_IDS.INSULATION.WOOD_FIBRE) {
      result.insulation_material_units = Math.ceil(surfaceArea / CALC_VALUES.wood_fibre);
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
    // Calculate total fixings needed (6 per sqm)
    const totalFixingsNeeded = surfaceArea * CALC_VALUES.fixings_per_sqm;
    
    // Determine box size based on fixing type
    // Default to metal (100 per box) unless plastic is explicitly selected
    let fixingsPerBox: number = CALC_VALUES.fixings_box_metal; // default: 100 per box
    if (inputs.fixingsType === OPTION_IDS.FIXINGS.PLASTIC) {
      fixingsPerBox = CALC_VALUES.fixings_box_plastic; // 200 per box
    }
    // Note: SCREW_METAL also uses 100 per box (same as METAL)
    
    result.fixings_units = Math.ceil(totalFixingsNeeded / fixingsPerBox);
    
    console.log('[calculateMaterials] Fixings calculation:', {
      isInsulationAndRender,
      thickness,
      surfaceArea,
      totalFixingsNeeded,
      fixingsType: inputs.fixingsType,
      fixingsPerBox,
      fixings_units: result.fixings_units
    });
  } else {
    result.fixings_units = 0;
    console.log('[calculateMaterials] Fixings skipped:', { isInsulationAndRender, thickness, isRenderOnly });
  }

  // ===== PRIMER =====
  // Primer-310 dla wybranych powierzchni (surface material)
  const surfacesNeedingPrimer310 = [
    OPTION_IDS.SURFACE.ICF,
    OPTION_IDS.SURFACE.PEBBLEDASH,
    OPTION_IDS.SURFACE.BLOCK,
    OPTION_IDS.SURFACE.BRICK,
    OPTION_IDS.SURFACE.PAINTED_BRICK,
    OPTION_IDS.SURFACE.SAND_CEMENT,
    OPTION_IDS.SURFACE.STONE
  ];
  
  const needsPrimer310 = inputs.surfaceMaterial && (surfacesNeedingPrimer310 as number[]).includes(inputs.surfaceMaterial);
  
  if (needsPrimer310) {
    result.primer_310_units = Math.ceil(surfaceArea / CALC_VALUES["primer-310"]);
  } else {
    result.primer_310_units = 0;
  }
  
  // Primer dla wszystkich renderów (NIE dla brick slips)
  // Доступен dla render only i insulation & render
  const isBrickSlips = inputs.renderType === OPTION_IDS.RENDER_TYPE.BRICK_SLIPS;
  
  if (!isBrickSlips) {
    // Optymalna kombinacja wiader 20kg i 7kg
    // primer-20 pokrywa 100m², primer-7 pokrywa 35m²
    result.primer_20_units = Math.floor(surfaceArea / CALC_VALUES["primer-20"]);
    const remainingArea = surfaceArea - (result.primer_20_units * CALC_VALUES["primer-20"]);
    result.primer_7_units = remainingArea > 0 ? Math.ceil(remainingArea / CALC_VALUES["primer-7"]) : 0;
  } else {
    result.primer_20_units = 0;
    result.primer_7_units = 0;
  }

  // ===== RENDER / BRICK SLIPS =====
  
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
  // Convert meters to pieces (round up)
  // User provides meters, we divide by length per piece and round up
  if (values[19]) {
    const meters = Number(values[19]) || 0;
    result.corner_beads = meters > 0 ? Math.ceil(meters / CALC_VALUES.beads.corner_beads) : 0;
  }
  if (values[20]) {
    const meters = Number(values[20]) || 0;
    result.stop_beads = meters > 0 ? Math.ceil(meters / CALC_VALUES.beads.stop_beads) : 0;
  }
  if (values[21]) {
    const meters = Number(values[21]) || 0;
    result.bellcast_beads = meters > 0 ? Math.ceil(meters / CALC_VALUES.beads.bellcast_beads) : 0;
  }
  if (values[22]) {
    const meters = Number(values[22]) || 0;
    result.window_reveal = meters > 0 ? Math.ceil(meters / CALC_VALUES.beads.window_reveal) : 0;
  }
  
  // Starter tracks (from nested substep) - metal or plastic
  if (values[18]) {
    const meters = Number(values[18]) || 0;
    result.starter_tracks = meters > 0 ? Math.ceil(meters / CALC_VALUES.beads.starter_track_metal) : 0;
  }
  if (values[32]) {
    const meters = Number(values[32]) || 0;
    result.starter_tracks = meters > 0 ? Math.ceil(meters / CALC_VALUES.beads.starter_track_plastic) : 0;
  }

  // ===== ADDITIONAL PRODUCTS =====
  // Corner brick slips - convert meters to boxes (round up)
  if (values[60]) {
    const meters = Number(values[60]) || 0;
    result.corner_brick_slips = meters > 0 ? Math.ceil(meters / CALC_VALUES.additional.corner_brick_slips) : 0;
  }
  
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
