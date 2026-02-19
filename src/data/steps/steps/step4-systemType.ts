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
    { id: OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, option_value: "Insulation & Render", json_value: "insulation_and_render", image: null },
    { 
        id: OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY,
        option_value: "Render only",
        json_value: "render_only",
        image: null,
        productCode: ["EWI-225", "PXM-165706"],
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