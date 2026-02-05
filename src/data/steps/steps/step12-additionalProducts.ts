import { FormStep } from "../types";

export const STEP_12_ADDITIONAL: FormStep = {
    id: 12,
    step_name: "Additional Products",
    description: null,
    json_key: "additionalProducts",
    input_type: null,
    placeholder: null,
    required: null,
    parent: null,
    validation_regex: null,
    substeps: [
    {
        id: 27,
        step_name: "Any levelling coat required (25kg bags)",
        description: null,
        json_key: "levelling-coat",
        input_type: "number",
        placeholder: "no. of bags",
        required: null,
        parent: 4,
        validation_regex: null,
        substeps: [],
        options: [],
        help: [],
        conditions: [],
        product: {
            productCode: "EWI-260",
            productName: "Levelling Mortar",
            image: "/media/levelling_coat.png",
            unitDetail: "25kg/bag",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/levelling-mortar-for-walls-ewi-260-25kg/"
        }
    },
    {
        id: 28,
        step_name: "Any fungicidal wash required (5L bottles)",
        description: null,
        json_key: "fungicidalwash",
        input_type: "number",
        placeholder: "no. of bottles",
        required: null,
        parent: 4,
        validation_regex: null,
        substeps: [],
        options: [],
        help: [],
        conditions: [],
        product: {
            productCode: "EVB-FUN5",
            productName: "Everbuild - 404 Fungicidal Wash",
            image: "/media/fungicidal.png",
            unitDetail: "5l/pcs",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/everbuild-404-fungicidal-wash/"
        }
    },
    {
        id: 29,
        step_name: "Any protection film required (100m rolls)",
        description: null,
        json_key: "bluefilm",
        input_type: "number",
        placeholder: "no. of rolls",
        required: null,
        parent: 4,
        validation_regex: null,
        substeps: [],
        options: [],
        help: [],
        conditions: [],
        product: {
            productCode: "STP-PFW-11",
            productName: "ProGuard Window Protection Film",
            image: "/media/protection-film.png",
            unitDetail: "100m/roll",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/proguard-window-protection-film/"
        }
    },
    {
        id: 30,
        step_name: "Any orange tape required (50m rolls)",
        description: null,
        json_key: "orangetape",
        input_type: "number",
        placeholder: "no. of rolls",
        required: null,
        parent: 4,
        validation_regex: null,
        substeps: [],
        options: [],
        help: [],
        conditions: [],
        product: {
            productCode: "EWS-TAPE-ORA",
            productName: "Orange Rendering Tape - 48mm x 50m",
            image: "/media/orange-tape.png",
            unitDetail: "50m/roll",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/ewi-store-rendering-tape-orange-48mm-x-50m/"
        }
    }
    ],
    options: [],
    help: [],
    conditions: []
};
