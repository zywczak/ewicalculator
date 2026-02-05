import OPTION_IDS from "../../constants/optionIds";
import { FormStep } from "../types";

export const STEP_10_GRAIN: FormStep = {
    id: 10,
    step_name: "Grain Sizes",
    description: null,
    json_key: "grainsize",
    input_type: "radio",
    placeholder: null,
    required: true,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    { id: OPTION_IDS.GRAINSIZE["0_5MM"], option_value: "0.5 mm", json_value: 0.5, image: "/media/texture_0_5mm.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.SILICONE] },
    { id: OPTION_IDS.GRAINSIZE["1MM"], option_value: "1 mm", json_value: 1, image: "/media/texture_1mm.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.RENDER_TYPE.SILICONE] },
    { id: OPTION_IDS.GRAINSIZE["1_5MM"], option_value: "1.5 mm", json_value: 1.5, image: "/media/texture_1_5mm.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, OPTION_IDS.RENDER_TYPE.SILICONE] },
    { id: OPTION_IDS.GRAINSIZE["2MM"], option_value: "2 mm", json_value: 2, image: "/media/texture_2mm.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.SILICONE] },
    { id: OPTION_IDS.GRAINSIZE["3MM"], option_value: "3 mm", json_value: 3, image: "/media/texture_3mm.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.SILICONE] },
    ],
    help: [
    {
        help_title: "Grain Sizes",
        upper_description: null,
        downer_description: "<h4>EWI Pro renders are available in a range of grain sizes:</h4><b>Silicone Render</b> – all sizes available<br /><b>Nano Drex Silicone Render</b> – 1mm, 1.5mm<br /><b>Premium Bio Silicone Render</b> – 1mm, 1.5mm<br /><b>Silicone-Silicate Render</b> – 1.5mm only",
        side_description:  "Approximate appearance of each render grain size.",
        images: [
        {
            image_name: "texture_0_5mm.png",
            caption: "0.5 mm",
            image_url: "/media/texture_0_5mm.png",
            description: null
        },
        {
            image_name: "texture_1mm.png",
            caption: "1 mm",
            image_url: "/media/texture_1mm.png",
            description: null
        },
        {
            image_name: "texture_1_5mm.png",
            caption: "1.5 mm",
            image_url: "/media/texture_1_5mm.png",
            description: null
        },
        {
            image_name: "texture_2mm.png",
            caption: "2 mm",
            image_url: "/media/texture_2mm.png",
            description: null
        },
        {
            image_name: "texture_3mm.png",
            caption: "3 mm",
            image_url: "/media/texture_3mm.png",
            description: null
        },
        ]
    }
    ],
    conditions: []
};
