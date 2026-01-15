
import OPTION_IDS from "../../constants/optionIds";
import { FormStep } from "../types";

export const STEP_11_COLOUR: FormStep = {
    id: 11,
    step_name: "Select colour",
    description: null,
    json_key: "colour",
    input_type: "colour",
    placeholder: null,
    required: null,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    // { id: OPTION_IDS.COLOURS.LILAC, option_value: "#C8A2C8", json_value: "#C8A2C8", image: null },
    // { id: OPTION_IDS.COLOURS.GREY, option_value: "#5B5D74", json_value: "#5B5D74", image: null },
    // { id: OPTION_IDS.COLOURS.GOLD, option_value: "#D4C279", json_value: "#D4C279", image: null },
    // { id: OPTION_IDS.COLOURS.BLACK, option_value: "#000000", json_value: "#000000", image: null },
    { id: OPTION_IDS.COLOURS.LILAC, option_value: "Sahara", json_value: "Sahara", image: null, option_image: "/media/sahara.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.GREY, option_value: "Blackpool", json_value: "Blackpool", image: null, option_image: "/media/blackpool.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.GOLD, option_value: "Colorado", json_value: "Colorado", image: null, option_image: "/media/colorado.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.BLACK, option_value: "Cordoba", json_value: "Cordoba", image: null, option_image: "/media/cordoba.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.BLACK, option_value: "Corsica", json_value: "Corsica", image: null, option_image: "/media/corsica.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.BLACK, option_value: "Nebraska", json_value: "Nebraska", image: null, option_image: "/media/nebraska.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.BLACK, option_value: "Malta", json_value: "Malta", image: null, option_image: "/media/malta.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.BLACK, option_value: "Alaska", json_value: "Alaska", image: null, option_image: "/media/alaska.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    { id: OPTION_IDS.COLOURS.BLACK, option_value: "Glasgow", json_value: "Glasgow", image: null, option_image: "/media/glasgow.png", parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS] },
    ],
    // options: [],
    help: [
    {
        help_title: "The colours",
        upper_description: null,
        downer_description: "<b>This is only preview</b> <br />For best matching or colour find, order one of our samples, or visit our store. <br />We offer 50 most popular colours in stock. <br /><br />For better user experience, we offer render samples: <ul><li>colour chart books</li><li>render sample sleeves</li><li>sample pots with render</li></ul>",
        useColourSamples: true,
        disclaimer:  "Disclaimer: Render colours may appear differently on-screen compared to real life. Therefore, we always recommend that you order a colour sample before making a final decision.",
    }
    ],
    conditions: []
};