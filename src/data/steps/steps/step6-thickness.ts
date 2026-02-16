import OPTION_IDS from "../../constants/optionIds";
import { HELP_TABLES } from "../../helpTables/tables";
import { FormStep } from "../types";

export const STEP_6_THICKNESS: FormStep = {
    id: 6,
    step_name: "Thickness of Insulation",
    description: null,
    json_key: "thickness",
    input_type: "radio",
    placeholder: null,
    required: true,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    { 
        id: OPTION_IDS.THICKNESS["25MM"], 
        option_value: "25 mm", 
        json_value: 25, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.KINGSPAN],
        products: {
            eps: {
                productCode: "EPS-020",
                productName: "EPS Insulation - 20mm",
                image: "/media/eps.png",
                unitDetail: "sqm",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/eps-insulation-1-board-0-72m2/"
            },
            kingspan: {
                productCode: "KNG-K5-020",
                productName: "Kingspan K5 - 20mm 0.72m2",
                image: "/media/kingspan.png",
                unitDetail: "boards",
                link: "https://ewistore.co.uk/shop/kingspan-k5-external-wall-board/"
            },
            wool: null
        }
    },
    { 
        id: OPTION_IDS.THICKNESS["50MM"], 
        option_value: "50 mm", 
        json_value: 50, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOL, OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.KINGSPAN],
        products: {
            eps: {
                productCode: "EPS-050",
                productName: "EPS Insulation - 50mm",
                image: "/media/eps.png",
                unitDetail: "sqm",
                link: "https://ewistore.co.uk/shop/ewi-410-eps-platinum-grey-insulation-50mm/"
            },
            kingspan: {
                productCode: "KNG-K5-050",
                productName: "Kingspan K5 - 50mm 0.72m2",
                image: "/media/kingspan.png",
                unitDetail: "boards",
                link: "https://ewistore.co.uk/shop/kingspan-k5-external-wall-board/"
            },
            wool: {
                productCode: "ROC-470-050",
                productName: "Rockwool Dual Density Slab (50mm)",
                image: "/media/mineralwool.png",
                unitDetail: "packs",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/rockwool-external-wall-dual-density-slab/"
            }
        }
    },
    { 
        id: OPTION_IDS.THICKNESS["60MM"], 
        option_value: "60 mm", 
        json_value: 60, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.KINGSPAN],
        products: {
            eps: null,
            kingspan: {
                productCode: "KNG-K5-060",
                productName: "Kingspan K5 - 60mm 0.72m2",
                image: "/media/kingspan.png",
                unitDetail: "boards",
                link: "https://ewistore.co.uk/shop/kingspan-k5-external-wall-board/"
            },
            wool: null
        }
    },
    { 
        id: OPTION_IDS.THICKNESS["70MM"], 
        option_value: "70 mm", 
        json_value: 70, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.KINGSPAN],
        products: {
            eps: {
                productCode: "EPS-070",
                productName: "EPS Insulation - 70mm",
                image: "/media/eps.png",
                unitDetail: "sqm",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/eps-insulation-1-board-0-72m2/"
            },
            kingspan: {
                productCode: "KNG-K5-070",
                productName: "Kingspan K5 - 70mm 0.72m2",
                image: "/media/kingspan.png",
                unitDetail: "boards",
                link: "https://ewistore.co.uk/shop/kingspan-k5-external-wall-board/"
            },
            wool: null
        }
    },
    { 
        id: OPTION_IDS.THICKNESS["90MM"], 
        option_value: "90 mm", 
        json_value: 90, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.WOOL],
        products: {
            eps: {
                productCode: "EPS-090",
                productName: "EPS Insulation - 90mm",
                image: "/media/eps.png",
                unitDetail: "sqm",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/eps-insulation-1-board-0-72m2/"
            },
            kingspan: null,
            wool: null
        }
    },
    { 
        id: OPTION_IDS.THICKNESS["100MM"], 
        option_value: "100 mm", 
        json_value: 100, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOL, OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.WOOD_FIBRE],
        products: {
            eps: {
                productCode: "EPS-100",
                productName: "EPS Insulation - 100mm",
                image: "/media/eps.png",
                unitDetail: "sqm",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/eps-insulation-1-board-0-72m2/"
            },
            kingspan: null,
            wool: {
                productCode: "ROC-470-100",
                productName: "Rockwool Dual Density Slab (100mm)",
                image: "/media/mineralwool.png",
                unitDetail: "packs",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/rockwool-external-wall-dual-density-slab/"
            },
            wood_fibre: {
                productCode: "STE-PROTECTLDRY",
                productName: "STEICO protect L dry - Wood Fibre Insulation Board",
                image: "/media/wood-fibre.png",
                unitDetail: "sqm",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/steico-protect-l-dry-wood-fibre-insulation-board/"
            }
        }
    },
    { 
        id: OPTION_IDS.THICKNESS["110MM"], 
        option_value: "110 mm", 
        json_value: 110, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOL],
        products: {
            eps: null,
            kingspan: null,
            wool: {
                productCode: "ROC-470-110",
                productName: "Rockwool Dual Density Slab (110mm)",
                image: "/media/mineralwool.png",
                unitDetail: "packs",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/rockwool-external-wall-dual-density-slab/"
            }
        }
    },
    { 
        id: OPTION_IDS.THICKNESS["120MM"], 
        option_value: "120 mm", 
        json_value: 120, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOD_FIBRE],
        products: {
            eps: null,
            kingspan: null,
            wool: null,
             wood_fibre: {
                productCode: "STE-PROTECTLDRY",
                productName: "STEICO protect L dry - Wood Fibre Insulation Board",
                image: "/media/wood-fibre.png",
                unitDetail: "sqm",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/steico-protect-l-dry-wood-fibre-insulation-board/"
            }
        }
    },
    { 
        id: OPTION_IDS.THICKNESS["140MM"], 
        option_value: "140 mm", 
        json_value: 140, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOD_FIBRE],
        products: {
            eps: null,
            kingspan: null,
            wool: null,
             wood_fibre: {
                productCode: "STE-PROTECTLDRY",
                productName: "STEICO protect L dry - Wood Fibre Insulation Board",
                image: "/media/wood-fibre.png",
                unitDetail: "sqm",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/steico-protect-l-dry-wood-fibre-insulation-board/"
            }
        }
    },
    { 
        id: OPTION_IDS.THICKNESS["150MM"], 
        option_value: "150 mm", 
        json_value: 150, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOL, OPTION_IDS.INSULATION.EPS],
        products: {
            eps: {
                productCode: "EPS-150",
                productName: "EPS Insulation - 150mm",
                image: "/media/eps.png",
                unitDetail: "sqm",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/eps-insulation-1-board-0-72m2/"
            },
            kingspan: null,
            wool: {
                productCode: "ROC-470-150",
                productName: "Rockwool Dual Density Slab (150mm)",
                image: "/media/mineralwool.png",
                unitDetail: "packs",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/rockwool-external-wall-dual-density-slab/"
            }
        }
    },
    { 
        id: OPTION_IDS.THICKNESS["160MM"], 
        option_value: "160 mm", 
        json_value: 160, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOD_FIBRE],
        products: {
            eps: null,
            kingspan: null,
            wool: null,
             wood_fibre: {
                productCode: "STE-PROTECTLDRY",
                productName: "STEICO protect L dry - Wood Fibre Insulation Board",
                image: "/media/wood-fibre.png",
                unitDetail: "sqm",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/steico-protect-l-dry-wood-fibre-insulation-board/"
            }
        }
    },
    { 
        id: OPTION_IDS.THICKNESS["200MM"], 
        option_value: "200 mm", 
        json_value: 200, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOD_FIBRE],
        products: {
            eps: null,
            kingspan: null,
            wool: null,
             wood_fibre: {
                productCode: "STE-PROTECTLDRY",
                productName: "STEICO protect L dry - Wood Fibre Insulation Board",
                image: "/media/wood-fibre.png",
                unitDetail: "sqm",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/steico-protect-l-dry-wood-fibre-insulation-board/"
            }
        }
    },
    ],
    help: [
    {
        help_title: "Thickness of Insulation",
        upper_description: null,
        downer_description: "The term U-value is used to define the rate of heat loss through a material. The lower the u-value, the better the insulation product performance.<br /><br />U-value is measured in W/m2.K (Watts per metre squared Kelvin), and in the table below, you can see the different U-values based on the different insulation materials and thicknesses (based on applying the insulation to a solid brick wall).",
        images: [],
        table: HELP_TABLES.thickness
    }
    ],
    conditions: [],
};