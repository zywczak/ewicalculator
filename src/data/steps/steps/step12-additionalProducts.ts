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
        placeholder: "meters",
        required: null,
        parent: 4,
        validation_regex: null,
        substeps: [],
        image: "/media/corner_brick_slips_placement.png",
        options: [],
        help: [],
        conditions: [],
        productCode: ["ELS-CORNER"],
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
        productCode: ["EWI-260"],
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
        productCode: ["EVB-FUN5"],
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
        productCode: ["STP-PFW-11"],
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
        productCode: ["EWS-TAPE-ORA"]
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
            description: "To achieve a truly authentic brick finish, L-shaped corner slips are installed alongside the standard Elabrick brick slips. These pieces wrap around external corners and openings so the brick pattern continues naturally around the edge rather than stopping at a join.This makes the installation look like genuine brickwork from all angles while still providing the insulation benefits of an external wall insulation system."
        },
        {
            image_name: "levelling_coat.png",
            caption: "Levelling Coat",
            image_url: "/media/levelling_coat.png",
            description: "Our EWI-260 levelling mortar is applied where required to create an even, stable surface before insulation boards are fixed. It can also be used as a scratch coat ready to receive the basecoat system. Proper preparation allows the insulation system to sit correctly, improves durability and helps the finished render appear uniform across the elevation."
        },
        {
            image_name: "fungicidal.png",
            caption: "Fungicidal Wash",
            image_url: "/media/fungicidal.png",
            description: "Before applying render or an EWI system, the surface needs to be properly prepared. A professional fungicidal treatment is applied to remove mould, algae and biological growth from the wall. This ensures the new system bonds correctly and prevents contamination from being trapped beneath the render, improving long-term performance and appearance."
        },
        {
            image_name: "protection-film.png",
            caption: "Protection Film",
            image_url: "/media/protection-film.png",
            description: "Protective film is applied to windows and frames during installation to protect against dust, mortar splashes and accidental scratches. This keeps glazing and uPVC clean throughout the works and is removed on completion, leaving the property tidy and ready to use."
        },
        {
            image_name: "orange-tape.png",
            caption: "Orange Tape",
            image_url: "/media/orange-tape.png",
            description: "A high-quality orange rendering tape is used around edges, junctions and vulnerable areas during installation. The tape is water-resistant and easy to tear, allowing accurate detailing and helping to protect against moisture ingress during the rendering process. Attention to small details like this helps achieve a neat finish and a reliable installation."
        }
        ]
    }
    ],
    conditions: []
};
