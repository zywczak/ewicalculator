import OPTION_IDS from "../../constants/optionIds";
import HELP_TABLES from "../../helpTables/tables";
import { FormStep } from "../types";

export const STEP_9_RENDER: FormStep = {
    id: 9,
    step_name: "Type of the system",
    description: null,
    json_key: "system",
    input_type: "radio",
    placeholder: null,
    required: true,
    parent: null,
    validation_regex: null,
    substeps: [],

    options: [
    { id: OPTION_IDS.RENDER_TYPE.NANO_DREX, option_value: "Nano Drex Silicone", json_value: "6", image: "/media/nanodrex.png" },
    { id: OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, option_value: "Premium Bio Silicone", json_value: "5", image: "/media/premiumbio.png" },
    { id: OPTION_IDS.RENDER_TYPE.SILICONE, option_value: "Silicone", json_value: "1", image: "/media/silicone.png" },
    { id: OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, option_value: "Silicone Silicate", json_value: "2", image: "/media/siliconesilicate.png" },
    { id: OPTION_IDS.RENDER_TYPE.BRICK_SLIPS, option_value: "Brick Slips", json_value: "7", image: "/media/brickslips.png" }
    ],
    help: [
    {
        help_title: "Type of Render",
        upper_description: null,
        downer_description: null,
        images: [],
        table: HELP_TABLES.renderType
    }
    ],
    conditions: [
    { trigger_step: 9, trigger_option: OPTION_IDS.RENDER_TYPE.BRICK_SLIPS, skip_steps: [10] }
    ]
};
