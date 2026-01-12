import OPTION_IDS from "../../constants/optionIds";
import { FormStep } from "../types";

export const STEP_8_BEADS: FormStep = {
    id: 8,
    step_name: "Beads & Trims",
    description: null,
    json_key: "beadsTrims",
    input_type: null,
    placeholder: null,
    required: null,
    parent: null,
    validation_regex: null,
    substeps: [
    {
        id: 31,
        step_name: null,
        description: null,
        json_key: "startbeads",
        input_type: null,
        placeholder: null,
        required: null,
        parent: 8,
        validation_regex: null,
        substeps: [
        {
            id: 17,
            step_name: "Type of starter tracks",
            description: null,
            json_key: "type",
            input_type: "radio",
            placeholder: null,
            required: null,
            parent: 31,
            validation_regex: null,
            substeps: [],
            options: [
            { id: OPTION_IDS.STARTER_TRACKS.METAL, option_value: "Metal", json_value: null, image: null },
            { id: OPTION_IDS.STARTER_TRACKS.PLASTIC, option_value: "Plastic", json_value: null, image: null }
            ],
            help: [],
            conditions: [
            { trigger_step: 17, trigger_option: OPTION_IDS.STARTER_TRACKS.METAL, skip_steps: [32], show_steps: [18] },
            { trigger_step: 17, trigger_option: OPTION_IDS.STARTER_TRACKS.PLASTIC, skip_steps: [18], show_steps: [32] },
            ]
        },
        {
            id: 18,
            step_name: "Number of starter tracks (2.5m)",
            description: null,
            json_key: "count",
            input_type: "number",
            placeholder: null,
            required: null,
            parent: 31,
            validation_regex: null,
            substeps: [],
            options: [],
            help: [],
            conditions: []
        },
        {
            id: 32,
            step_name: "Number of starter tracks (2.0m)",
            description: null,
            json_key: "count",
            input_type: "number",
            placeholder: null,
            required: null,
            parent: 31,
            validation_regex: null,
            substeps: [],
            options: [],
            help: [],
            conditions: []
        },
        ],
        options: [],
        help: [],
        conditions: []
    },
    {
        id: 19,
        step_name: "Number of corner beads (2.5m)",
        description: null,
        json_key: "cornerbeads",
        input_type: "number",
        placeholder: null,
        required: null,
        parent: 8,
        validation_regex: null,
        substeps: [],
        options: [],
        help: [],
        conditions: []
    },
    {
        id: 20,
        step_name: "Number of stop beads (2.5m)",
        description: null,
        json_key: "stopbeads",
        input_type: "number",
        placeholder: null,
        required: null,
        parent: 8,
        validation_regex: null,
        substeps: [],
        options: [],
        help: [],
        conditions: []
    },
    {
        id: 21,
        step_name: "Number of bellcast beads (2.5m)",
        description: null,
        json_key: "bellcastbeads",
        input_type: "number",
        placeholder: null,
        required: null,
        parent: 8,
        validation_regex: null,
        substeps: [],
        options: [],
        help: [],
        conditions: []
    },
    {
        id: 22,
        step_name: "Number of window reveal (2.5m)",
        description: null,
        json_key: "revealbeads",
        input_type: "number",
        placeholder: null,
        required: null,
        parent: 8,
        validation_regex: null,
        substeps: [],
        options: [],
        help: [],
        conditions: []
    }
    ],
    options: [],
    help: [
    {
        help_title: "Beads & Trims",
        upper_description: "Our beads and trims provide the perfect finishing touch for external wall insulation and render systems, ensuring clean lines, protected edges, and long-lasting durability. Designed for easy installation and compatibility with modern render systems, they help prevent cracking, manage movement, and deliver a professional finish every time. Ideal for corners, windows, doors, and terminations, they combine performance with a neat, high-quality appearance.",
        downer_description: null,
        images: [
        {
            image_name: "bellcastbead.png",
            caption: "Bellcast Bead",
            image_url: "/media/bellcastbead.png",
            description: "Bellcast bead consists of a rigid PVC 45-degree angle and is used at the bottom of render only systems to direct water away from the render system."
        },
        {
            image_name: "stopbead.png",
            caption: "Stop Bead",
            image_url: "/media/stopbead.png",
            description: 'The 6mm stop bead is made from PVC and has a "wing" of fibre glass mesh connected to it that gets basecoated into the thin coat render system. The 90-degree angle on the stop bead help create a tidy square finish at the edge of the external render systems'
        },
        {
            image_name: "cornerbead.png",
            caption: "Corner Bead",
            image_url: "/media/cornerbead.png",
            description: 'The corner bead consists of a rigid PVC 90-degree angle, with two "wings" of fibreglass mesh. It gets embedded on all external corners of a render only or external wall insulation system within the cementitious basecoat layer. Corner bead is used to prov'
        },
        {
            image_name: "startertrack.png",
            caption: "Starter track",
            image_url: "/media/startertrack.png",
            description: "Stater track is used at the bottom of insulation systems to protect this area of the system. It also provides a plinth which can be used as a level guide to build the insulation up from."
        },
        {
            image_name: "windowreveal.png",
            caption: "Window Reveal Bead",
            image_url: "/media/windowreveal.png",
            description: "Window reveal bead (or APU bead) is designed to make contact with the frame of the window this bead is used to give a clean, professional finish around windows and doors, creating a long-lasting weatherproof solution."
        }
        ]
    }
    ],
    conditions: []
};