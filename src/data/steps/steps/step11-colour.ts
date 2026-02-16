import OPTION_IDS from "../../constants/optionIds";
import { FormStep } from "../types";

const RENDER_PARENTS = [
  OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE,
  OPTION_IDS.RENDER_TYPE.SILICONE,
  OPTION_IDS.RENDER_TYPE.NANO_DREX,
  OPTION_IDS.RENDER_TYPE.PREMIUM_BIO
];

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
        parent_option_id: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS],
        product: {
            productCode: "ELS-GLASGOW-SLIP-1M2",
            productName: "Elabrick Brick Slips - Glasgow",
            image: "/media/glasgow.png",
            unitDetail: "1sqm/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips-glasgow/"
        }
    },
    { id: OPTION_IDS.COLOURS.COLOR_10001, option_value: "Brilliant White", json_value: "10001-Brilliant_White", image: "/media/colors/10001-Brilliant_White.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_20001_PURE_WHITE, option_value: "Pure White", json_value: "20001-Pure_White", image: "/media/colors/20001-Pure_White.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_20001, option_value: "20001", json_value: "20001", image: "/media/colors/20001.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_20168, option_value: "Paraffin", json_value: "20168-Paraffin", image: "/media/colors/20168-Paraffin.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_21189, option_value: "Peach", json_value: "21189-Peach", image: "/media/colors/21189-Peach.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_22219, option_value: "Peony", json_value: "22219-Peony", image: "/media/colors/22219-Peony.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_22440, option_value: "Rose", json_value: "22440-Rose", image: "/media/colors/22440-Rose.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_22594, option_value: "Coral", json_value: "22594-Coral", image: "/media/colors/22594-Coral.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_23544, option_value: "Elderflower", json_value: "23544-Elderflower", image: "/media/colors/23544-Elderflower.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_24194, option_value: "Mirror", json_value: "24194-Mirror", image: "/media/colors/24194-Mirror.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_25070, option_value: "Sage", json_value: "25070-Sage", image: "/media/colors/25070-Sage.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_25820, option_value: "Prosecco", json_value: "25820-Prosecco", image: "/media/colors/25820-Prosecco.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_26470, option_value: "Silk", json_value: "26470-Silk", image: "/media/colors/26470-Silk.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27037, option_value: "Acorn", json_value: "27037-Acorn", image: "/media/colors/27037-Acorn.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27041, option_value: "Truffle", json_value: "27041-Truffle", image: "/media/colors/27041-Truffle.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27116, option_value: "Storm", json_value: "27116-Storm", image: "/media/colors/27116-Storm.jpg",  parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27120, option_value: "Silver", json_value: "27120-Silver", image: "/media/colors/27120-Silver.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27254, option_value: "Walnut", json_value: "27254-Walnut", image: "/media/colors/27254-Walnut.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27408, option_value: "Steel", json_value: "27408-Steel", image: "/media/colors/27408-Steel.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27412, option_value: "Ash", json_value: "27412-Ash", image: "/media/colors/27412-Ash.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27416, option_value: "Smoke", json_value: "27416-Smoke", image: "/media/colors/27416-Smoke.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27420, option_value: "Diamond", json_value: "27420-Diamond", image: "/media/colors/27420-Diamond.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27491, option_value: "Concrete", json_value: "27491-Concrete", image: "/media/colors/27491-Concrete.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27495, option_value: "Fog", json_value: "27495-Fog", image: "/media/colors/27495-Fog.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27554, option_value: "Lead", json_value: "27554-Lead", image: "/media/colors/27554-Lead.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27566, option_value: "Cloud", json_value: "27566-Cloud", image: "/media/colors/27566-Cloud.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28010, option_value: "Porcelain", json_value: "28010-Porcelain", image: "/media/colors/28010-Porcelain.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28012, option_value: "Bone", json_value: "28012-Bone", image: "/media/colors/28012-Bone.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28014, option_value: "Haze", json_value: "28014-Haze", image: "/media/colors/28014-Haze.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28018, option_value: "Ivory", json_value: "28018-Ivory", image: "/media/colors/28018-Ivory.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28028, option_value: "Eggshell", json_value: "28028-Eggshell", image: "/media/colors/28028-Eggshell.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28030, option_value: "Almond", json_value: "28030-Almond", image: "/media/colors/28030-Almond.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28036, option_value: "Magnolia", json_value: "28036-Magnolia", image: "/media/colors/28036-Magnolia.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28038, option_value: "Mist", json_value: "28038-Mist", image: "/media/colors/28038-Mist.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28048, option_value: "Linen", json_value: "28048-Linen", image: "/media/colors/28048-Linen.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28050, option_value: "Frost", json_value: "28050-Frost", image: "/media/colors/28050-Frost.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28056, option_value: "Opal", json_value: "28056-Opal", image: "/media/colors/28056-Opal.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28058, option_value: "Ice", json_value: "28058-Ice", image: "/media/colors/28058-Ice.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28070, option_value: "Sandstone", json_value: "28070-Sandstone", image: "/media/colors/28070-Sandstone.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28076, option_value: "Antique White", json_value: "28076-Antique_White", image: "/media/colors/28076-Antique_White.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28078, option_value: "Copenhagen", json_value: "28078-Copenhagen", image: "/media/colors/28078-Copenhagen.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28080, option_value: "Platinum", json_value: "28080-Platinum", image: "/media/colors/28080-Platinum.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_28088, option_value: "Orchid", json_value: "28088-Orchid", image: "/media/colors/28088-Orchid.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_29050, option_value: "Seashell", json_value: "29050-Seashell", image: "/media/colors/29050-Seashell.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_29315, option_value: "Dune", json_value: "29315-Dune", image: "/media/colors/29315-Dune.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_29710, option_value: "HailStone", json_value: "29710-HailStone", image: "/media/colors/29710-HailStone.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_29740, option_value: "Anthracite", json_value: "29740-Anthracite", image: "/media/colors/29740-Anthracite.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_27570, option_value: "Clay", json_value: "27570-Clay", image: "/media/colors/27570-Clay.jpg", parent_option_id: RENDER_PARENTS },
    { id: OPTION_IDS.COLOURS.COLOR_29755, option_value: "Slate", json_value: "29755-Slate", image: "/media/colors/29755-Slate.jpg", parent_option_id: RENDER_PARENTS }

    ],
    help: [
    {
        help_title: "The Colours",
        upper_description: null,
        downer_description: "<b>This is only preview</b> <br />For accurate colour matching, we recommend ordering one of our samples or visiting our store.<br />Choose from 49 of our most popular colours, all in stock.<br /><br />For a better user experience, we provide render samples:<ul><li>colour chart books</li><li>render sample sleeves</li><li>sample pots with render</li></ul>",
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