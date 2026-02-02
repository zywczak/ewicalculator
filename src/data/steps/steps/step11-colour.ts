import OPTION_IDS from "../../constants/optionIds";
import { FormStep } from "../types";

export const STEP_11_COLOUR: FormStep = {
    id: 11,
    step_name: "Select Colour",
    description: null,
    json_key: "colour",
    input_type: "colour",
    placeholder: null,
    required: true,
    parent: null,
    validation_regex: null,
    generateImageWithAI: true,
    aiImagePrompt: "Change the facade color to {option_value}. Only change the wall color to match the {option_value} tone. Realistic architectural photography, natural daylight, professional render application.",
    image: "/media/paint_palette.gif",
    substeps: [],
    options: [
    { id: OPTION_IDS.COLOURS.SAHARA, option_value: "Sahara", json_value: "sahara", image: "/media/sahara.png", option_image: "/media/sahara.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.BLACKPOOL, option_value: "Blackpool", json_value: "blackpool", image: "/media/blackpool.png", option_image: "/media/blackpool.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.COLORADO, option_value: "Colorado", json_value: "colorado", image: "/media/colorado.png", option_image: "/media/colorado.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.CORDOBA, option_value: "Cordoba", json_value: "cordoba", image: "/media/cordoba.png", option_image: "/media/cordoba.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.CORSICA, option_value: "Corsica", json_value: "corsica", image: "/media/corsica.png", option_image: "/media/corsica.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.NEBRASKA, option_value: "Nebraska", json_value: "nebraska", image: "/media/nebraska.png", option_image: "/media/nebraska.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.MALTA, option_value: "Malta", json_value: "malta", image: "/media/malta.png", option_image: "/media/malta.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.ALASKA, option_value: "Alaska", json_value: "alaska", image: "/media/alaska.png", option_image: "/media/alaska.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.GLASGOW, option_value: "Glasgow", json_value: "glasgow", image: "/media/glasgow.png", option_image: "/media/glasgow.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    ],
    help: [
    {
        help_title: "The Colours",
        upper_description: null,
        downer_description: "<b>This is only preview</b> <br />For accurate colour matching, we recommend ordering one of our samples or visiting our store.<br />Choose from 50 of our most popular colours, all in stock.<br /><br />For a better user experience, we provide render samples:<ul><li>colour chart books</li><li>render sample sleeves</li><li>sample pots with render</li></ul>",
        useColourSamples: true,
        disclaimer:  "Disclaimer: Render colours may appear differently on-screen compared to real life. Therefore, we always recommend that you order a colour sample before making a final decision.",
    },
    {
        help_title: "Brick Slip Colours",
        upper_description: null,
        downer_description: "<b>This is only preview</b> <br />For accurate colour matching, we recommend ordering one of our samples or visiting our store.<br /><br />For a better user experience, we provide render samples:<ul><li>colour chart books</li><li>render sample sleeves</li><li>sample pots with render</li></ul>",
        disclaimer:  "Disclaimer: Render colours may appear differently on-screen compared to real life. Therefore, we always recommend that you order a colour sample before making a final decision.",
        useOptionColours: true
    }
    ],
    conditions: []
};