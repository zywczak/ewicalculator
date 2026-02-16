import OPTION_IDS from "../../constants/optionIds";
import { FormStep } from "../types";

export const STEP_2_SURFACE: FormStep = {
    id: 2,
    step_name: "Where Will It Be Installed?",
    description: null,
    json_key: "surfaceMaterial",
    input_type: "radio",
    placeholder: null,
    required: true,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    { id: OPTION_IDS.SURFACE.ICF, option_value: "ICF", json_value: 6, image: "/media/icf.jpg",
        product: {
            productCode: "EWI-310",
            productName: "Universal Primer",
            image: "/media/universal_primer.png",
            unitDetail: "bucket",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/universal-primer-ewi-310-20kg/"
        }
     },
    { id: OPTION_IDS.SURFACE.PEBBLEDASH, option_value: "Pebbledash", json_value: 4, image: "/media/pebbledash.jpg",
        product: {
            productCode: "EWI-310",
            productName: "Universal Primer",
            image: "/media/universal_primer.png",
            unitDetail: "bucket",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/universal-primer-ewi-310-20kg/"
        }
     },
    { id: OPTION_IDS.SURFACE.BLOCK, option_value: "Blockwork", json_value: 3, image: "/media/block.jpg",
        product: {
            productCode: "EWI-310",
            productName: "Universal Primer",
            image: "/media/universal_primer.png",
            unitDetail: "bucket",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/universal-primer-ewi-310-20kg/"
        }
     },
    { id: OPTION_IDS.SURFACE.BRICK, option_value: "Brick", json_value: 1, image: "/media/brick.jpg",
        product: {
            productCode: "EWI-310",
            productName: "Universal Primer",
            image: "/media/universal_primer.png",
            unitDetail: "bucket",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/universal-primer-ewi-310-20kg/"
        }
     },
    { id: OPTION_IDS.SURFACE.PAINTED_BRICK, option_value: "Painted brick", json_value: 2, image: "/media/paintedbrick.jpg",
        product: {
            productCode: "EWI-310",
            productName: "Universal Primer",
            image: "/media/universal_primer.png",
            unitDetail: "bucket",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/universal-primer-ewi-310-20kg/"
        }
     },
    { id: OPTION_IDS.SURFACE.SAND_CEMENT, option_value: "Sand & cement render", json_value: 5, image: "/media/sandandcement.jpg",
        product: {
            productCode: "EWI-310",
            productName: "Universal Primer",
            image: "/media/universal_primer.png",
            unitDetail: "bucket",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/universal-primer-ewi-310-20kg/"
        }
     },
    { id: OPTION_IDS.SURFACE.RENDER_CARRIER, option_value: "Render carrier board", json_value: 7, image: "/media/rendercarrierboard.jpg" },
    { id: OPTION_IDS.SURFACE.STONE, option_value: "Other", json_value: 8, image: "/media/other.jpg",
        product: {
            productCode: "EWI-310",
            productName: "Universal Primer",
            image: "/media/universal_primer.png",
            unitDetail: "bucket",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/universal-primer-ewi-310-20kg/"
        }
     },
    ],
    help: [
    {
        help_title: "Where will it be installed?",
        upper_description: "To ensure the correct primer is supplied (if required), please advise which substrate the EWI Pro materials will be installed on.<br/><br />The primer helps improve adhesion and regulate absorption. ",
        downer_description: null,
        images: [
        { image_name: "sandandcement.jpg", caption: "Sand and Cement", image_url: "/media/sandandcement.jpg", description: null },
        { image_name: "rendercarrierboard.jpg", caption: "Render Carrier Board", image_url: "/media/rendercarrierboard.jpg", description: null },
        { image_name: "pebbledash.jpg", caption: "Pebbledash", image_url: "/media/pebbledash.jpg", description: null },
        { image_name: "paintedbrick.jpg", caption: "Painted Brick", image_url: "/media/paintedbrick.jpg", description: null },
        { image_name: "icf.jpg", caption: "ICF", image_url: "/media/icf.jpg", description: null },
        { image_name: "brick.jpg", caption: "Brick", image_url: "/media/brick.jpg", description: null },
        { image_name: "block.jpg", caption: "Block", image_url: "/media/block.jpg", description: null },
        { image_name: "other.jpg", caption: "Other", image_url: "/media/other.jpg", description: null },
        ]
    }
    ],
    conditions: []
};