import OPTION_IDS from "../../constants/optionIds";
import { FormStep } from "../types";

export const STEP_1_HOUSE: FormStep = {
    id: 1,
    step_name: "Type of House",
    description: "",
    json_key: "house",
    input_type: "radio",
    placeholder: null,
    required: true,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    { id: OPTION_IDS.HOUSE.DETACHED, option_value: "Detached", json_value: 1, image: null },
    { id: OPTION_IDS.HOUSE.SEMI_DETACHED, option_value: "Semi detached", json_value: 2, image: null },
    { id: OPTION_IDS.HOUSE.TERRACED, option_value: "Mid terrace", json_value: 3, image: null },        
    ],
    help: [],
    conditions: []
};
