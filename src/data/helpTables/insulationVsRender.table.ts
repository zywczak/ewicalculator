import { SimpleTable } from "./types";


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