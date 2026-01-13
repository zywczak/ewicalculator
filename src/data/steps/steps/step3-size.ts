import { FormStep } from "../types";

export const STEP_3_SIZE: FormStep = {
    id: 3,
    step_name: "Surface area",
    description: "",
    json_key: "measurement",
    input_type: "number",
    placeholder: "Enter m²",
    required: true,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [],
    help: [
    {
        help_title: "Surface area",
        upper_description: "We do not recommend removing window + doors from your calculations.",
        downer_description: "<span style='color: #437A8E; font-size: 20px; display: block;'>It's easy</span><b style='font-size: 28px; display: block; font-weight: 700'>a x b = surface area</b>",
        images: [
        { image_name: "surface_area_ewistore.jpg", caption: null, image_url: "/media/surface_area_ewistore.jpg", description: null }
        ]
    }
    ],
    conditions: []
};