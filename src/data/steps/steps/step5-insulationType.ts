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
    { id: OPTION_IDS.INSULATION.KINGSPAN, option_value: "Kingspan k5", json_value: "Kingspan", image: "/media/kingspan.png", option_image: "/media/kingspan.png" },
    { id: OPTION_IDS.INSULATION.EPS, option_value: "EPS", json_value: "EPS", image: "/media/eps.png", option_image: "/media/eps.png" },
    { id: OPTION_IDS.INSULATION.WOOL, option_value: "Mineral wool", json_value: "Wool", image: "/media/mineralwool.png", option_image: "/media/mineralwool.png" }
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