import { FormStep } from "../types";

export const STEP_3_SIZE: FormStep = {
    id: 3,
    step_name: "Surface Area",
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
        help_title: "Surface Area",
        upper_description: "We do not recommend removing windows and doors from your calculations, as this may affect accuracy.",
        downer_description: null,
        images: [
        { image_name: "surface_area_ewistore.jpg", caption: null, image_url: "/media/surface_area_ewistore.jpg", description: null }
        ]
    }
    ],
    conditions: [],
};