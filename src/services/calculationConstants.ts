// Calculation constants from legacy calculator
export const CALC_VALUES = {
  // Insulation material coverage (sqm per unit)
  wool2: 2.88,
  wool3: 2.16 ,
  wool4: 0.72,
  wool5: 12.96,
  wool6: 11.52,
  eps: 0.72, // EPS uses direct sqm
  kingspan: 0.72,
  
  // Other materials
  adhesive: 2.5, // sqm per bag
  adhesive_ro: 3.5,   // sqm per bag (render only)
  adhesive_brick_slips: 6, // sqm per bucket (brcik slips adhesive)
  mesh: 42.5, // sqm per roll
  fixings: 30, // sqm per box
  "primer-20": 100, // sqm per bucket
  "primer-7": 35, // sqm per bucket
  
  // Brick slips materials
  brick_slips: 1, // 1 bag per sqm ////////////// 
  brick_slips_adhesive: 6, // 1 bucket per 6 sqm
  
  // Render coverage by grain size (sqm per bucket)
  render: {
    "0.5": 20,
    "1": 13,
    "1.5": 10,
    "2": 8,
    "3": 6
  }
} as const;
