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
  wood_fibre: 0.48,
  
  // Other materials
  adhesive: 2.5, // sqm per bag
  adhesive_ro: 3.5,   // sqm per bag (render only)
  adhesive_brick_slips: 6, // sqm per bucket (brcik slips adhesive)
  mesh: 42.5, // sqm per roll
  fixings_per_sqm: 7, // number of fixings needed per square meter
  fixings_box_plastic: 200, // plastic fixings per box
  fixings_box_metal: 100, // metal/screw fixings per box
  "primer-20": 60, // sqm per bucket   
  "primer-7": 20, // sqm per bucket
  "primer-310": 60, // sqm per bucket
  
  // Brick slips materials
  brick_slips: 1, // 1 bag per sqm ////////////// 
  brick_slips_adhesive: 6, // 1 bucket per 6 sqm
  
  // Render coverage by grain size (sqm per bucket)
  render: {
    "0.5": 18,
    "1": 12,
    "1.5": 9,
    "2": 8,
    "3": 6
  },
  
  // Beads & Trims lengths (meters per piece)
  beads: {
    starter_track_metal: 2.5, // meters per piece
    starter_track_plastic: 2, // meters per piece
    corner_beads: 2.5, // meters per piece
    stop_beads: 2.5, // meters per piece
    bellcast_beads: 2.5, // meters per piece
    window_reveal: 2.6 // meters per piece
  },
  
  // Additional products
  additional: {
    corner_brick_slips: 2 // meters per box
  }
} as const;
