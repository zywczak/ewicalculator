import OPTION_IDS from "../../constants/optionIds";
import { FormStep } from "../types";

export const STEP_7_FIXINGS: FormStep = {
    id: 7,
    step_name: "Type of fixings",
    description: null,
    json_key: "fixings",
    input_type: "radio",
    placeholder: null,
    required: null,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    { id: OPTION_IDS.FIXINGS.PLASTIC, option_value: "Plastic", json_value: "2", image: "/media/plasticfixing.png" },
    { id: OPTION_IDS.FIXINGS.METAL, option_value: "Metal", json_value: "1", image: "/media/metalfixing.png" },
    { id: OPTION_IDS.FIXINGS.SCREW, option_value: "Screw", json_value: "3", image: "/media/screwfixing.png" }
    ],
    help: [
    {
        help_title: "Type of mechanical Fixings",
        upper_description: null,
        downer_description: `When you install our external wall insulation systems, the insulation boards are held in place with both adhesive and mechanical fixings.<br/><br/>We offer two types of fixing – metal or plastic pin and both types are available in 4 different lengths depending on the thickness of the insusulation used.<br/><br/>We recommend that the fixing is always <strong>50mm longer</strong> than the thickness of the insulation used to ensure it is anchored securely to the wall.`,
        images: [
        { image_name: "fixings.jpg", caption: null, image_url: "/media/fixings.jpg", description: null }
        ]
    }
    ],
    conditions: []
};