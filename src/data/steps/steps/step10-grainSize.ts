import OPTION_IDS from "../../constants/optionIds";
import { FormStep } from "../types";

export const STEP_10_GRAIN: FormStep = {
    id: 10,
    step_name: "Render grain size",
    description: null,
    json_key: "grainsize",
    input_type: "radio",
    placeholder: null,
    required: true,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    { id: OPTION_IDS.GRAINSIZE["0_5MM"], option_value: "0.5 mm", json_value: "0.5", image: null, parent_option_id: [OPTION_IDS.RENDER_TYPE.SILICONE] },
    { id: OPTION_IDS.GRAINSIZE["1MM"], option_value: "1 mm", json_value: "1", image: null, parent_option_id: [OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.RENDER_TYPE.SILICONE] },
    { id: OPTION_IDS.GRAINSIZE["1_5MM"], option_value: "1.5 mm", json_value: "1.5", image: null, parent_option_id: [OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, OPTION_IDS.RENDER_TYPE.SILICONE] },
    { id: OPTION_IDS.GRAINSIZE["2MM"], option_value: "2 mm", json_value: "2", image: null, parent_option_id: [OPTION_IDS.RENDER_TYPE.SILICONE] },
    { id: OPTION_IDS.GRAINSIZE["3MM"], option_value: "3 mm", json_value: "3", image: null, parent_option_id: [OPTION_IDS.RENDER_TYPE.SILICONE] },
    ],
    help: [
    {
        help_title: "Render grain size",
        upper_description: null,
        downer_description: "Our renders are available in 5 different grains thicknesses. Render samples available online and in-store are in 1.0mm and 1.5mm sizes.",
        side_description:  "We offer 5 grain sizes, 0.5mm, 1mm, 1.5mm, 2mm and 3mm depending on the finish required. <br /> <b>Silicone, Silicone-Silicate, Nano Drex Silicone, Premium Bio Silicone</b>",
        images: [
        {
            image_name: "bellcastbead.png",
            caption: "0.5 mm",
            image_url: "/media/bellcastbead.png",
            description: null
        },
        {
            image_name: "bellcastbead.png",
            caption: "1 mm",
            image_url: "/media/bellcastbead.png",
            description: null
        },
        {
            image_name: "stopbead.png",
            caption: "1.5 mm",
            image_url: "/media/stopbead.png",
            description: null
        },
        {
            image_name: "cornerbead.png",
            caption: "2 mm",
            image_url: "/media/cornerbead.png",
            description: null
        },
        {
            image_name: "startertrack.png",
            caption: "3 mm",
            image_url: "/media/startertrack.png",
            description: null
        },
        ]
    }
    ],
    conditions: []
};
