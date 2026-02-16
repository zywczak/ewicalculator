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
            { id: OPTION_IDS.STARTER_TRACKS.METAL, option_value: "Metal", json_value: 2, image: null },
            { id: OPTION_IDS.STARTER_TRACKS.PLASTIC, option_value: "Plastic", json_value: 1, image: null }
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
            placeholder: "meters",
            required: null,
            parent: 31,
            image: "/media/metalstartertrack.png",
            validation_regex: null,
            substeps: [],
            options: [],
            help: [],
            conditions: [],
            products: {
                "startertrack": {
                    productCode: "CMS-800-20",
                    productName: "Premium Aluminium Starter Track",
                    image: "/media/metalstartertrack.png",
                    unitDetail: "2.5m/pc",
                    link: "https://ewistore.co.uk/shop/external-wall-insulation/premium-aluminium-starter-track-2-5m/"
                },
                "clip on": {
                    productCode: "LIK-136",
                    productName: "Clip-on Profile for Starter Track",
                    image: "/media/clip_on.png",
                    unitDetail: "2.5m/pc",
                    link: "https://ewistore.co.uk/shop/external-wall-insulation/6mm-clip-on-profile/shop/external-wall-insulation/6mm-clip-on-profile-2-5m/-2-5m/"
                },
            }
        },
        {
            id: 32,
            step_name: "Number of starter tracks (2.0m)",
            description: null,
            json_key: "count",
            input_type: "number",
            placeholder: "meters",
            required: null,
            parent: 31,
            image: "/media/plastic-start-bead.png",
            validation_regex: null,
            substeps: [],
            options: [],
            help: [],
            conditions: [],
            product: {
                productCode: "VWS-4206",
                productName: "Adjustable uPVC Starter Track",
                image: "/media/plastic-start-bead.png",
                unitDetail: "2.0m/pc",
                link: "https://ewistore.co.uk/shop/external-wall-insulation/adjustable-upvc-starter-track-2m/"
            }
        },
        ],
        options: [],
        help: [],
        conditions: [],
    },
    {
        id: 19,
        step_name: "Number of corner beads (2.5m)",
        description: null,
        json_key: "cornerbeads",
        input_type: "number",
        placeholder: "meters",
        required: null,
        parent: 8,
        validation_regex: null,
        substeps: [],
        options: [],
        image: "/media/cornerbead.png",
        help: [],
        conditions: [],
        product: {
            productCode: "LIK-115",
            productName: "uPVC Render Corner Bead",
            image: "/media/cornerbead.png",
            unitDetail: "2.5m/pc",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/pvc-corner-bead-with-mesh-2-5m/"
        }
    },
    {
        id: 20,
        step_name: "Number of stop beads (2.5m)",
        description: null,
        json_key: "stopbeads",
        input_type: "number",
        placeholder: "meters",
        required: null,
        parent: 8,
        validation_regex: null,
        substeps: [],
        options: [],
        image: "/media/stopbead.png",
        help: [],
        conditions: [],
        product: {
            productCode: "LIK-121",
            productName: "uPVC Stop Bead with Mesh",
            image: "/media/stopbead.png",
            unitDetail: "2.5m/pc",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/upvc-stop-bead-with-mesh-2-5m/"
        }
    },
    {
        id: 21,
        step_name: "Number of bellcast beads (2.5m)",
        description: null,
        json_key: "bellcastbeads",
        input_type: "number",
        placeholder: "meters",
        required: null,
        parent: 8,
        validation_regex: null,
        substeps: [],
        image: "/media/bellcastbead.png",
        options: [],
        help: [],
        conditions: [],
        product: {
            productCode: "LIK-566",
            productName: "Bellcast Bead - 10mm",
            image: "/media/bellcastbead.png",
            unitDetail: "2.5m/pc",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/white-bellcast-bead-14mm-single-bead/"
        }
    },
    {
        id: 22,
        step_name: "Number of window reveal (2.6m)",
        description: null,
        json_key: "revealbeads",
        input_type: "number",
        placeholder: "meters",
        required: null,
        parent: 8,
        validation_regex: null,
        substeps: [],
        image: "/media/windowreveal.png",
        options: [],
        help: [],
        conditions: [],
        product: {
            productCode: "LIK-160",
            productName: "Window Reveal Bead with Protective Lip & Mesh",
            image: "/media/windowreveal.png",
            unitDetail: "2.6m/pc",
            link: "https://ewistore.co.uk/shop/external-wall-insulation/white-window-reveal-bead-with-mesh/"
        }
    }
    ],
    options: [],
    help: [
    {
        help_title: "Beads & Trims",
        upper_description: "Our beads and trims provide the perfect finishing touch for external wall insulation and render systems, ensuring clean lines, protected edges and long-lasting durability. Designed for easy installation and compatibility with modern render systems, they help prevent cracking, accommodate movement and deliver a professional finish every time. Ideal for corners, windows, doors and terminations, they combine performance with a neat, high-quality appearance.",
        downer_description: null,
        images: [
        {
            image_name: "bellcastbead.png",
            caption: "Bellcast Bead",
            image_url: "/media/bellcastbead.png",
            description: "A bellcast bead consists of a rigid PVC 45-degree angle and is used at the base of render-only systems to direct water away from the render."
        },
        {
            image_name: "stopbead.png",
            caption: "Stop Bead",
            image_url: "/media/stopbead.png",
            description: 'The 6 mm stop bead is manufactured from PVC and features a fibreglass mesh wing that is embedded into the thin-coat render system’s basecoat. The 90-degree angle helps create a neat, square finish at the edges of external render systems.'
        },
        {
            image_name: "cornerbead.png",
            caption: "Corner Bead",
            image_url: "/media/cornerbead.png",
            description: 'A corner bead consists of a rigid PVC 90-degree angle with two fibreglass mesh wings. It is embedded into all external corners of render-only or external wall insulation systems within the cementitious basecoat layer. Corner bead is specifically designed to reduce damage, and minimise the formation of cracks around openings.'
        },
        {
            image_name: "startertrack.png",
            caption: "Starter track",
            image_url: "/media/startertrack.png",
            description: "The starter track is installed at the base of insulation systems to protect this area and provide a level guide for building up the insulation."
        },
        {
            image_name: "windowreveal.png",
            caption: "Window Reveal Bead",
            image_url: "/media/windowreveal.png",
            description: "A window reveal bead (also known as an APU bead) is designed to make direct contact with the window frame. It is used to provide a clean, professional finish around windows and doors, creating a long-lasting, weatherproof solution."
        }
        ]
    }
    ],
    conditions: []
};