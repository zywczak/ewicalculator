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
    substeps: [],
    options: [
    { 
        id: OPTION_IDS.COLOURS.SAHARA,
        option_value: "Sahara",
        json_value: "sahara",
        image: "/media/sahara.png",
        option_image: "/media/sahara.png",
        parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS],
        product: {
            productCode: "ELS-SAHARA-SLIP-1M2",
            productName: "Elabrick Brick Slips - Sahara",
            image: "/media/sahara.png",
            unitDetail: "1sqm/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-sahara/"
        }    
    },
    { 
        id: OPTION_IDS.COLOURS.BLACKPOOL,
        option_value: "Blackpool",
        json_value: "blackpool",
        image: "/media/blackpool.png",
        option_image: "/media/blackpool.png",
        parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS],
        product: {
            productCode: "ELS-BLACKPOOL-SLIP-1M2",
            productName: "Elabrick Brick Slips - Blackpool",
            image: "/media/blackpool.png",
            unitDetail: "1sqm/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips---blackpool-corner-brick-slip/"
        }    
    },
    { 
        id: OPTION_IDS.COLOURS.COLORADO,
        option_value: "Colorado",
        json_value: "colorado",
        image: "/media/colorado.png",
        option_image: "/media/colorado.png",
        parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS],
        product: {
            productCode: "ELS-COLORADO-SLIP-1M2",
            productName: "Elabrick Brick Slips - Colorado",
            image: "/media/colorado.png",
            unitDetail: "1sqm/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-colorado/"
        }
    },
    { 
        id: OPTION_IDS.COLOURS.CORDOBA,
        option_value: "Cordoba",
        json_value: "cordoba",
        image: "/media/cordoba.png",
        option_image: "/media/cordoba.png",
        parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS],
        product: {
            productCode: "ELS-CORDOBA-SLIP-1M2",
            productName: "Elabrick Brick Slips - Cordoba",
            image: "/media/cordoba.png",
            unitDetail: "1sqm/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-cordoba/"
        }
    },
    { 
        id: OPTION_IDS.COLOURS.CORSICA,
        option_value: "Corsica",
        json_value: "corsica",
        image: "/media/corsica.png",
        option_image: "/media/corsica.png",
        parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS],
        product: {
            productCode: "ELS-CORSICA-SLIP-1M2",
            productName: "Elabrick Brick Slips - Corsica",
            image: "/media/corsica.png",
            unitDetail: "1sqm/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-corsica/"
        }
    },
    { 
        id: OPTION_IDS.COLOURS.NEBRASKA,
        option_value: "Nebraska",
        json_value: "nebraska",
        image: "/media/nebraska.png",
        option_image: "/media/nebraska.png",
        parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS],
        product: {
            productCode: "ELS-NEBRASKA-SLIP-1M2",
            productName: "Elabrick Brick Slips - Nebraska",
            image: "/media/nebraska.png",
            unitDetail: "1sqm/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-nebraska/"
        }
    },
    { 
        id: OPTION_IDS.COLOURS.MALTA,
        option_value: "Malta",
        json_value: "malta",
        image: "/media/malta.png",
        option_image: "/media/malta.png",
        parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS],
        product: {
            productCode: "ELS-MALTA-SLIP-1M2",
            productName: "Elabrick Brick Slips - Malta",
            image: "/media/malta.png",
            unitDetail: "1sqm/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-malta/"
        }
    },
    { 
        id: OPTION_IDS.COLOURS.ALASKA,
        option_value: "Alaska",
        json_value: "alaska",
        image: "/media/alaska.png",
        option_image: "/media/alaska.png",
        parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS],
        product: {
            productCode: "ELS-ALASKA-SLIP-1M2",
            productName: "Elabrick Brick Slips - Alaska",
            image: "/media/alaska.png",
            unitDetail: "1sqm/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-alaska/"
        }
    },
    { 
        id: OPTION_IDS.COLOURS.GLASGOW,
        option_value: "Glasgow",
        json_value: "glasgow",
        image: "/media/glasgow.png",
        option_image: "/media/glasgow.png",
        parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS],
        product: {
            productCode: "ELS-GLASGOW-SLIP-1M2",
            productName: "Elabrick Brick Slips - Glasgow",
            image: "/media/glasgow.png",
            unitDetail: "1sqm/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-glasgow/"
        }
    },
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
    conditions: [],
};