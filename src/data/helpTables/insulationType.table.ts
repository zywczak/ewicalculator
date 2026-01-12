import { SimpleTable } from "./types";

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