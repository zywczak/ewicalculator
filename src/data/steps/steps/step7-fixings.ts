import OPTION_IDS from "../../constants/optionIds";
import { FormStep } from "../types";

export const STEP_7_FIXINGS: FormStep = {
    id: 7,
    step_name: "Type of Fixings",
    description: null,
    json_key: "fixings",
    input_type: "radio",
    placeholder: null,
    required: false,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    { id: OPTION_IDS.FIXINGS.PLASTIC, option_value: "Plastic", json_value: "plastic", image: "/media/hammer_plastic_fixing.png",
        parent_option_id: [OPTION_IDS.INSULATION.EPS],
        productCode: ["WKR-FIXPLUG10"],
    },
    { id: OPTION_IDS.FIXINGS.METAL, option_value: "Hammer Metal", json_value: "hammer_metal", image: "/media/metal_hammer_fixing.png",
        parent_option_id: [OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.WOOL],
        productCode: ["ZIEL-ETX-M"],
     },
     { id: OPTION_IDS.FIXINGS.SCREW_METAL, option_value: "Screw Metal", json_value: "screw_metal", image: "/media/screw_metal_fixing.png",
        parent_option_id: [OPTION_IDS.INSULATION.KINGSPAN, OPTION_IDS.INSULATION.WOOL, OPTION_IDS.INSULATION.WOOD_FIBRE],
        productCode: ["ZIEL-ETX-MT", "RWL-R-TFIX-8S"],
     },
    ],
    help: [
    {
        help_title: "Type of Mechanical Fixings",
        upper_description: null,
        downer_description: `When you install our external wall insulation systems, the insulation boards are held in place with both adhesive and mechanical fixings.<br/><br/>We offer two types of fixing, metal or plastic pin, and both types are available in 4 different lengths depending on the thickness of the insulation used.<br/><br/>We recommend that the fixing is always <strong>50mm longer</strong> than the thickness of the insulation used to ensure it is anchored securely to the wall.`,
        images: [
        { image_name: "fixings.jpg", caption: null, image_url: "/media/fixings.jpg", description: null }
        ]
    }
    ],
    conditions: [],
};