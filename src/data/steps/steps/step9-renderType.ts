import OPTION_IDS from "../../constants/optionIds";
import HELP_TABLES from "../../helpTables/tables";
import { FormStep } from "../types";

export const STEP_9_RENDER: FormStep = {
    id: 9,
    step_name: "Type of Decorative Finish",
    description: null,
    json_key: "system",
    input_type: "radio",
    placeholder: null,
    required: true,
    parent: null,
    validation_regex: null,
    substeps: [],

    options: [
    { 
        id: OPTION_IDS.RENDER_TYPE.NANO_DREX,
        option_value: "Nano Drex Silicone",
        json_value: "nano_drex_silicone",
        image: "/media/nanodrex.png",
        productCode: ["EWI-077-1.5A", "EWI-333-20", "EWI-333-7"],
    },
    { 
        id: OPTION_IDS.RENDER_TYPE.PREMIUM_BIO,
        option_value: "Premium Bio Silicone",
        json_value: "premium_bio_silicone",
        image: "/media/premiumbio.png",
        productCode: ["EWI-076", "EWI-333-20", "EWI-333-7"],
    },
    { 
        id: OPTION_IDS.RENDER_TYPE.SILICONE,
        option_value: "Silicone",
        json_value: "silicone",
        image: "/media/silicone.png",
        productCode: ["EWI-075", "EWI-333-20", "EWI-333-7"],
        default: true,
    },
    { 
        id: OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE,
        option_value: "Silicone Silicate",
        json_value: "silicone_silicate",
        image: "/media/siliconesilicate.png",
        productCode: ["EWI-040", "EWI-333-20", "EWI-333-7"],
    },
    { 
        id: OPTION_IDS.RENDER_TYPE.BRICK_SLIPS,
        option_value: "Brick Slips",
        json_value: "brick_slips",
        image: "/media/brickslips.png",
        productCode: ["ELS-15KG-CEMENT-GREY"],
    }
    ],
    help: [
    {
        help_title: "Type of Decorative Finish",
        upper_description: null,
        downer_description: null,
        images: [],
        table: HELP_TABLES.renderType
    }
    ],
    conditions: [
        { trigger_step: 9, trigger_option: OPTION_IDS.RENDER_TYPE.BRICK_SLIPS, skip_steps: [10] },
        { trigger_step: 9, trigger_option: OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, skip_steps: [60] },
        { trigger_step: 9, trigger_option: OPTION_IDS.RENDER_TYPE.SILICONE, skip_steps: [60] },
        { trigger_step: 9, trigger_option: OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, skip_steps: [60] },
        { trigger_step: 9, trigger_option: OPTION_IDS.RENDER_TYPE.NANO_DREX, skip_steps: [60] }
    ],
};
