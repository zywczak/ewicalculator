import { SimpleTable } from "./types";

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