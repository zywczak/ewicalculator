import { SimpleTable } from "./types";

export const RENDER_TYPE_TABLE: SimpleTable = {
  id: 3,
  title: "Type of the system",
  description: null,
  
  columns: [
    { label: "Nano Drex Silicone", image: "/media/nanodrex.png" },
    { label: "Premium Bio Silicone", image: "/media/premiumbio.png" },
    { label: "Silicone", image: "/media/silicone.png" },
    { label: "Silicone Silicate", image: "/media/siliconesilicate.png" },
    { label: "Brick Slips", image: "/media/brickslips.png" }
  ],
  
  rows: [
    { 
      label: "Vapour permeability", 
      icon: "/media/polygon.png", 
      type: "scale", 
      scale: [1, 4], 
      values: [4, 3, 3, 3, 4] 
    },
    { 
      label: "Elasticity", 
      icon: "/media/polygon.png", 
      type: "scale", 
      scale: [1, 4], 
      values: [4, 4, 3, 3, 4] 
    },
    { 
      label: "Self-cleaning", 
      icon: "/media/polygon.png", 
      type: "scale", 
      scale: [1, 4], 
      values: [4, 4, 3, 2, 4] 
    },
    { 
      label: "Resistance to algae", 
      icon: "/media/polygon.png", 
      type: "scale", 
      scale: [1, 4], 
      values: [4, 4, 3, 3, 4] 
    },
    { 
      label: "Impact resistance", 
      icon: "/media/polygon.png", 
      type: "scale", 
      scale: [1, 4], 
      values: [3, 4, 3, 3, 4] 
    },
    { 
      label: "UV resistance", 
      icon: "/media/polygon.png", 
      type: "scale", 
      scale: [1, 4], 
      values: [4, 4, 3, 2, 4] 
    }
  ]
};
