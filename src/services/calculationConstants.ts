// Calculation constants from legacy calculator
export const CALC_VALUES = {
  // Insulation material coverage (sqm per unit)
  wool: 1.44,
  wool2: 2.88,
  wool3: 2.16,
  wool4: 0.72,
  eps: 1, // EPS uses direct sqm
  kingspan: 0.72,
  
  // Other materials
  adhesive: 2, // bags per sqm
  adhesive_ro: 3, // bags per sqm (render only)
  mesh: 42.5, // sqm per roll
  fixings: 20, // sqm per box
  primer: 20, // sqm per bucket
  paint: 20, // sqm per bucket
  
  // Brick slips materials
  brick_slips: 1, // 1 bag per sqm
  brick_slips_adhesive: 6, // 1 bucket per 6 sqm
  
  // Render coverage by grain size (sqm per bucket)
  render: {
    "0.5": 9,
    "1": 9,
    "1.5": 9,
    "2": 9,
    "3": 9
  }
} as const;
