export type TableRowType = "text" | "scale" | "boolean";

export interface TableColumn {
  label: string;
  image?: string;
  borderColor?: string;
  backgroundColor?: string;
}

export interface TableRow {
  label: string;
  icon?: string;
  type?: TableRowType;
  scale?: [number, number];
  values: (string | number | boolean | null)[];
}

export interface SimpleTable {
  id: number;
  title: string;
  description?: string | null;
  columns: TableColumn[];
  rows: TableRow[];
}

export const INSULATION_VS_RENDER_TABLE: SimpleTable = {
  id: 1,
  title: "Type of insulation",
  description: null,
  
  columns: [
    { label: "Insulation & Render", borderColor: "#A32362" },
    { label: "Render only", borderColor: "#0097CF" }
  ],
  
  rows: [
    { label: "Improve thermal comfort", type: "boolean", values: [true, null] },
    { label: "Reduce Energy Bills", type: "boolean", values: [true, null] },
    { label: "Improve look of property", type: "boolean", values: [true, true] },
    { label: "Crack free solution", type: "boolean", values: [true, true] },
    { label: "Weatherproof/Damp prevention", type: "boolean", values: [true, true] },
    { label: "Increase Property Value", type: "boolean", values: [true, true] }
  ]
};

export const THICKNESS_UVALUE_TABLE: SimpleTable = {
  id: 2,
  title: "Thickness of insulation",
  description: `The term U-value is used to define the rate of heat loss through a material. The lower the u-value, the better the insulation product performance.<br/><br/>U-value is measured in W/m<sup>2</sup>.K (Watts per metre squared Kelvin) and in the table below you can see the different u-values based on the different insulation materials and thicknesses (based on applying the insulation to a solid brick wall).`,
  
  columns: [
    { label: "EPS", borderColor: "#D9D9D9" },
    { label: "Mineral Wool", borderColor: "#C9B458" },
    { label: "Kingspan", borderColor: "#FFC0CB" }
  ],
  
  rows: [
    { label: "20 mm", type: "text", values: ["0.88 W/m<sup>2</sup>.K", null, "0.72 W/m<sup>2</sup>.K"] },
    { label: "50 mm", type: "text", values: ["0.48 W/m<sup>2</sup>.K", "0.53 W/m<sup>2</sup>.K", "0.33 W/m<sup>2</sup>.K"] },
    { label: "60 mm", type: "text", values: [null, null, "0.29 W/m<sup>2</sup>.K"] },
    { label: "70 mm", type: "text", values: ["0.37 W/m<sup>2</sup>.K", null, "0.25 W/m<sup>2</sup>.K"] },
    { label: "90 mm", type: "text", values: ["0.30 W/m<sup>2</sup>.K", null, null] },
    { label: "100 mm", type: "text", values: ["0.28 W/m<sup>2</sup>.K", "0.30 W/m<sup>2</sup>.K", null] },
    { label: "110 mm", type: "text", values: [null, "0.28 W/m<sup>2</sup>.K", null] },
    { label: "150 mm", type: "text", values: ["0.19 W/m<sup>2</sup>.K", "0.21 W/m<sup>2</sup>.K", null] }
  ]
};

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

export const INSULATION_TYPE_TABLE: SimpleTable = {
  id: 4,
  title: "Type of Insulation",
  description: "We offer three main types of insulation material - EPS, Mineral Wool (Rockwool) and Kingspan K5, which all have slightly different properties.",
  
  columns: [
    { label: "EPS", borderColor: "#D9D9D9" },
    { label: "Mineral Wool", borderColor: "#C9B458" },
    { label: "Kingspan", borderColor: "#FFC0CB" }
  ],
  
  rows: [
    { 
      label: "Thermal Conductivity", 
      icon: "/media/star.png", 
      type: "scale", 
      scale: [1, 3], 
      values: [2, 1.5, 3] 
    },
    { 
      label: "W/mK", 
      type: "text", 
      values: ["0.032", "0.036", "0.02"] 
    },
    { 
      label: "System Fire Rating", 
      icon: "/media/fire.png", 
      type: "scale", 
      scale: [1, 3], 
      values: [1, 3, 1] 
    },
    { 
      label: "Fire Class", 
      type: "text", 
      values: ["Class B2", "Class A2", "Class 0"] 
    },
    { 
      label: "Breathability", 
      icon: "/media/flower.jpg", 
      type: "scale", 
      scale: [1, 3], 
      values: [1, 3, 1] 
    },
    { 
      label: "Recyclable", 
      icon: "/media/checkmark", 
      type: "boolean", 
      values: [true, true, true] 
    },
    { 
      label: "System Pricing", 
      icon: "/media/funt.png", 
      type: "scale", 
      scale: [1, 3], 
      values: [1, 2, 2] 
    }
  ]
};

export const HELP_TABLES = {
  insulationVsRender: INSULATION_VS_RENDER_TABLE,
  thickness: THICKNESS_UVALUE_TABLE,
  renderType: RENDER_TYPE_TABLE,
  insulationType: INSULATION_TYPE_TABLE
};

export default HELP_TABLES;