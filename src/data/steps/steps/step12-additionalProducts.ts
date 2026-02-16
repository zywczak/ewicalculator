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
        id: 60,
        step_name: "Corner brick slips",
        description: null,
        json_key: "corner-brick-slips",
        input_type: "number",
        placeholder: "no.of meter",
        required: null,
        parent: 4,
        validation_regex: null,
        substeps: [],
        image: "/media/corner_brick_slips_placement.png",
        options: [],
        help: [],
        conditions: [],
        product: {
            productCode: "ELS-CORNER",
            productName: "Corner Brick Slip",
            image: "/media/brick_slip_corners.png",
            unitDetail: "2lm/box",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/elabrick-brick-slips---cordoba/"
        }
    },
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
        image: "/media/levelling_coat.png",
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
        image: "/media/fungicidal.png",
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
        image: "/media/protection-film.png",
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
        image: "/media/orange-tape.png",
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
    help: [
    {
        help_title: "Additional Products",
        upper_description: null,
        downer_description: null,
        images: [
         {
            image_name: "brick_slip_corners.png",
            caption: "Brick Slip Corners",
            image_url: "/media/brick_slip_corners.png",
            description: "Elabrick Brick Slips strongly mimic the look of brickwork. Flexible and durable, these are ideal if you want to recreate brick features internally or externally."
        },
        {
            image_name: "levelling_coat.png",
            caption: "Levelling Coat",
            image_url: "/media/levelling_coat.png",
            description: "Our EWI-260 levelling mortar is used on walls to produce a smooth surface or a scratch coat on which a basecoat or EWI system can be applied."
        },
        {
            image_name: "fungicidal.png",
            caption: "Fungicidal Wash",
            image_url: "/media/fungicidal.png",
            description: "The Everbuild 404 Fungicidal Wash is great when used prior to applying render or EWI systems. It effectively kills mould and other biological growth on internal and external walls, floors and ceilings."
        },
        {
            image_name: "protection-film.png",
            caption: "Protection Film",
            image_url: "/media/protection-film.png",
            description: 'ProGuard Window Protection Film is designed to protect windows from paint, damage, scratches and mortar splashed during construction and decorating work.'
        },
        {
            image_name: "orange-tape.png",
            caption: "Orange Tape",
            image_url: "/media/orange-tape.png",
            description: "EWI Store - Rendering Tape is a premium orange rendering tape offers water resistance and is easy to tear."
        }
        ]
    }
    ],
    conditions: []
};
