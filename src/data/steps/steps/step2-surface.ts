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
    { id: OPTION_IDS.SURFACE.ICF, option_value: "ICF", json_value: "icf", image: "/media/icf.jpg",
        productCode: ["EWI-310"]
     },
    { id: OPTION_IDS.SURFACE.PEBBLEDASH, option_value: "Pebbledash", json_value: "pebbledash", image: "/media/pebbledash.jpg",
        productCode: ["EWI-310"]
     },
    { id: OPTION_IDS.SURFACE.BLOCK, option_value: "Blockwork", json_value: "block", image: "/media/block.jpg",
        productCode: ["EWI-310"]
     },
    { id: OPTION_IDS.SURFACE.BRICK, option_value: "Brick", json_value: "brick", image: "/media/brick.jpg",
        productCode: ["EWI-310"]
     },
    { id: OPTION_IDS.SURFACE.PAINTED_BRICK, option_value: "Painted brick", json_value: "painted_brick", image: "/media/paintedbrick.jpg",
        productCode: ["EWI-310"]
     },
    { id: OPTION_IDS.SURFACE.SAND_CEMENT, option_value: "Sand & cement render", json_value: "sand_cement", image: "/media/sandandcement.jpg",
        productCode: ["EWI-310"]
     },
    { id: OPTION_IDS.SURFACE.RENDER_CARRIER, option_value: "Render carrier board", json_value: "render_carrier_board", image: "/media/rendercarrierboard.jpg" },
    { id: OPTION_IDS.SURFACE.STONE, option_value: "Other", json_value: "other", image: "/media/other.jpg",
        productCode: ["EWI-310"]
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