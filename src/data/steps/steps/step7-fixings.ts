import OPTION_IDS from "../../constants/optionIds";
import { FormStep } from "../types";

export const STEP_7_FIXINGS: FormStep = {
    id: 7,
    step_name: "Type of Fixings",
    description: null,
    json_key: "fixings",
    input_type: "radio",
    placeholder: null,
    required: false,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    { id: OPTION_IDS.FIXINGS.PLASTIC, option_value: "Plastic", json_value: 2, image: "/media/hammer_plastic_fixing.png",
        parent_option_id: [OPTION_IDS.INSULATION.EPS],
        product: {
            productCode: "WKR-FIXPLUG10",
            productName: "Hammer Fixing with Plastic Pin (200/box)",
            image: "/media/hammer_plastic_fixing.png",
            unitDetail: "200/box",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/10mm-hammer-fixing-with-plastic-pin-fixplug-10/",
            avaliable_lenght: [120, 140, 160, 180]
     },
    },
    { id: OPTION_IDS.FIXINGS.METAL, option_value: "Hammer Metal", json_value: 1, image: "/media/metal_hammer_fixing.png",
        parent_option_id: [OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.WOOL],
        product: {
            productCode: "ZIEL-ETX-M",
            productName: "EWI Pro - Metal Hammer Fixing (100/box)",
            image: "/media/metal_hammer_fixing.png",  
            unitDetail: "100/box",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/ewi-pro-metal-hammer-fixing-8mm/",
            avaliable_lenght: [75, 95, 115, 135, 155, 175, 195]
        },
     },
     { id: OPTION_IDS.FIXINGS.SCREW_METAL, option_value: "Screw Metal", json_value: 1, image: "/media/screw_metal_fixing.png",
        parent_option_id: [OPTION_IDS.INSULATION.KINGSPAN, OPTION_IDS.INSULATION.WOOL, OPTION_IDS.INSULATION.WOOD_FIBRE],
        product: {
            productCode: "ZIEL-ETX-MT",
            productName: "EWI Pro - Metal Screw Insulation Fixing (100/box)",
            image: "/media/screw_metal_fixing.png",  
            unitDetail: "100/box",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/ewi-pro-metal-screw-fixing-8mm/",
            avaliable_lenght: [95, 115, 135, 155, 175, 195, 215, 255]
        },
     },
    ],
    help: [
    {
        help_title: "Type of Mechanical Fixings",
        upper_description: null,
        downer_description: `When you install our external wall insulation systems, the insulation boards are held in place with both adhesive and mechanical fixings.<br/><br/>We offer two types of fixing, metal or plastic pin, and both types are available in 4 different lengths depending on the thickness of the insulation used.<br/><br/>We recommend that the fixing is always <strong>50mm longer</strong> than the thickness of the insulation used to ensure it is anchored securely to the wall.`,
        images: [
        { image_name: "fixings.jpg", caption: null, image_url: "/media/fixings.jpg", description: null }
        ]
    }
    ],
    conditions: [],
};