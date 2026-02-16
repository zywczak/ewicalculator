import OPTION_IDS from "../../constants/optionIds";
import { HELP_TABLES } from "../../helpTables/tables";
import { FormStep } from "../types";

export const STEP_5_INSULATION: FormStep = {
    id: 5,
    step_name: "Type of Insulation",
    description: null,
    json_key: "insulationType",
    input_type: "radio",
    placeholder: null,
    required: true,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    { id: OPTION_IDS.INSULATION.KINGSPAN, option_value: "Kingspan k5", json_value: "Kingspan", image: "/media/kingspan.png",
        products: {
            "adhesive": {
                productCode: "EWI-225",
                productName: "Premium Basecoat 25kg",
                image: "/media/adhesive.png",
                unitDetail: "25kg/bag",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/premium-basecoat-ewi-225-25kg/"
            },
            "mesh": {
                productCode: "PXM-165706",
                productName: "Orange Fibreglass Mesh (165g/m²)",
                image: "/media/orange-fibreglass-mesh.png",
                unitDetail: "50 sqm/roll",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/orange-fibreglass-mesh-50m2/"
            }
        }
     },
    { id: OPTION_IDS.INSULATION.EPS, option_value: "EPS", json_value: "EPS", image: "/media/eps.png",
        products: {
            "adhesive": {
                productCode: "EWI-220",
                productName: "EPS Basecoat Adhesive 25kg",
                image: "/media/eps_adhesive.png",
                unitDetail: "25kg/bag",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/eps-basecoat-adhesive-ewi-220-25kg/"
            },
            "mesh": {
                productCode: "PXM-165702",
                productName: "Fibreglass Mesh (165g/m²)",
                image: "/media/fibreglass-mesh.png",
                unitDetail: "50 sqm/roll",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/fibreglass-mesh-150g-m2-50m2/"
            }
        }
     },
    { id: OPTION_IDS.INSULATION.WOOL, option_value: "Mineral wool", json_value: "Wool", image: "/media/mineralwool.png",
        products: {
            "adhesive": {
                productCode: "EWI-225",
                productName: "Premium Basecoat 25kg",
                image: "/media/adhesive.png",
                unitDetail: "25kg/bag",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/premium-basecoat-ewi-225-25kg/"
            },
            "mesh": {
                productCode: "PXM-165706",
                productName: "Orange Fibreglass Mesh (165g/m²)",
                image: "/media/orange-fibreglass-mesh.png",
                unitDetail: "50 sqm/roll",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/orange-fibreglass-mesh-50m2/"
            }
        }
     },
     { id: OPTION_IDS.INSULATION.WOOD_FIBRE, option_value: "Wood Fibre", json_value: "Wood Fibre", image: "/media/wood-fibre.png",
        products: {
            "adhesive": {
                productCode: "EWI-225",
                productName: "Premium Basecoat 25kg",
                image: "/media/adhesive.png",
                unitDetail: "25kg/bag",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/premium-basecoat-ewi-225-25kg/"
            },
            "mesh": {
                productCode: "PXM-165706",
                productName: "Orange Fibreglass Mesh (165g/m²)",
                image: "/media/orange-fibreglass-mesh.png",
                unitDetail: "50 sqm/roll",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/orange-fibreglass-mesh-50m2/"
            }
        }
     }
    ],
    help: [
    {
        help_title: "Type of Insulation",
        upper_description: "We offer three main insulation materials: EPS, Mineral Wool (Rockwool) and Kingspan K5. Each has slightly different properties.",
        downer_description: null,
        images: [],
        table: HELP_TABLES.insulationType
    }
    ],
    conditions: [],
};