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
        json_value: 6,
        image: "/media/nanodrex.png",
        products: {
            "render": {
                productCode: "EWI-077-1.5A",
                productName: "Nano Drex Silicone Render",
                image: "/media/nanodrex.png",
                unitDetail: "25kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/silicone-render-nano-drex-ewi-077-25kg/"
            },
            "primer-20": {
                productCode: "EWI-333-20",
                productName: "Top Coat Primer - 20kg",
                image: "/media/primer20.png",
                unitDetail: "20kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/top-coat-primer-20kg/"
            },
            "primer-7": {
                productCode: "EWI-333-7",
                productName: "Top Coat Primer - 7kg",
                image: "/media/primer7.png",
                unitDetail: "7kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/top-coat-primer-7kg/"
            }
        }
    },
    { 
        id: OPTION_IDS.RENDER_TYPE.PREMIUM_BIO,
        option_value: "Premium Bio Silicone",
        json_value: 5,
        image: "/media/premiumbio.png",
        products: {
            "render": {
                productCode: "EWI-076",
                productName: "Premium Bio Silicone Render",
                image: "/media/premiumbio.png",
                unitDetail: "25kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/silicone-render-premium-bio-ewi-076-25kg/"
            },
            "primer-20": {
                productCode: "EWI-333-20",
                productName: "Top Coat Primer - 20kg",
                image: "/media/primer20.png",
                unitDetail: "20kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/top-coat-primer-20kg/"
            },
            "primer-7": {
                productCode: "EWI-333-7",
                productName: "Top Coat Primer - 7kg",
                image: "/media/primer7.png",
                unitDetail: "7kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/top-coat-primer-7kg/"
            }
        }
    },
    { 
        id: OPTION_IDS.RENDER_TYPE.SILICONE,
        option_value: "Silicone",
        json_value: 1,
        image: "/media/silicone.png",
        products: {
            "render": {
                productCode: "EWI-075",
                productName: "Silicone Render",
                image: "/media/silicone.png",
                unitDetail: "25kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/silicone-render-ewi-075-25kg-2-0mm/"
            },
            "primer-20": {
                productCode: "EWI-333-20",
                productName: "Top Coat Primer - 20kg",
                image: "/media/primer20.png",
                unitDetail: "20kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/top-coat-primer-20kg/"
            },
            "primer-7": {
                productCode: "EWI-333-7",
                productName: "Top Coat Primer - 7kg",
                image: "/media/primer7.png",
                unitDetail: "7kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/top-coat-primer-7kg/"
            }
        }
    },
    { 
        id: OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE,
        option_value: "Silicone Silicate",
        json_value: 2,
        image: "/media/siliconesilicate.png",
        products: {
            "render": {
                productCode: "EWI-040",
                productName: "Silicone Silicate Render",
                image: "/media/siliconesilicate.png",
                unitDetail: "25kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/silicone-silicate-render-ewi-040-25kg/"
            },
            "primer-20": {
                productCode: "EWI-333-20",
                productName: "Top Coat Primer - 20kg",
                image: "/media/primer20.png",
                unitDetail: "20kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/top-coat-primer-20kg/"
            },
            "primer-7": {
                productCode: "EWI-333-7",
                productName: "Top Coat Primer - 7kg",
                image: "/media/primer7.png",
                unitDetail: "7kg/bucket",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/top-coat-primer-7kg/"
            }
        }
    },
    { 
        id: OPTION_IDS.RENDER_TYPE.BRICK_SLIPS,
        option_value: "Brick Slips",
        json_value: 7,
        image: "/media/brickslips.png",
        product: {
            productCode: "ELS-15KG-CEMENT-GREY",
            productName: "Elabrick Special Adhesive - Cement Grey",
            image: "/media/adhecive_brick_slips.png",
            unitDetail: "15kg/bucket",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-special-adhesive-15kg/"
        }
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
