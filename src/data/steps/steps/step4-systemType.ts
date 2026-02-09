import OPTION_IDS from "../../constants/optionIds";
import { HELP_TABLES } from "../../helpTables/tables";
import { FormStep } from "../types";

export const STEP_4_SYSTEM_TYPE: FormStep = {
    id: 4,
    step_name: "Insulation or Render Only?",
    description: "",
    json_key: "material",
    input_type: "radio",
    placeholder: null,
    required: true,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    { id: OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, option_value: "Insulation & Render", json_value: 1, image: null },
    { 
        id: OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY,
        option_value: "Render only",
        json_value: 2,
        image: null,
        products: {
        "adhesive": {
            productCode: "EWI-225",
            productName: "Premium Basecoat 25kg",
            image: "/media/adhesive.png",
            unitDetail: "25kg/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/premium-basecoat-ewi-225-25kg/"
        },
        "mesh": {
            productCode: "PXM-165702",
            productName: "Fibreglass Mesh (165g/m²)",
            image: "/media/fibreglass-mesh.png",
            unitDetail: "50 sqm/roll",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/fibreglass-mesh-150g-m2-50m2/"
        }
    }
    }
    ],
    help: [
    {
        help_title: "Advantages of Insulation",
        upper_description: null,
        downer_description: null,
        images: [],
        table: HELP_TABLES.insulationVsRender
    }
    ],
    conditions: [
    { trigger_step: 4, trigger_option: OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY, skip_steps: [5, 6, 7, 31] },
    { trigger_step: 4, trigger_option: OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, skip_steps: [21] },
    ]
};