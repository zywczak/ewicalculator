import { FormStep } from "../types";

export const STEP_13_CUSTOMER: FormStep = {
    id: 13,
    step_name: "Receive <span style='color: #48D858'>your</span> personalised quote!",
    description: "To get a personalised quote (with generous discount!) please fill in your details below. You will then receive the quote by email within a couple of minutes.",
    json_key: "customer_details",
    input_type: null,
    placeholder: null,
    required: null,
    parent: null,
    validation_regex: null,
    substeps: [
    {
        id: 23,
        step_name: "Name",
        description: null,
        json_key: "name",
        input_type: "text",
        placeholder: null,
        required: true,
        parent: 15,
        validation_regex: String.raw`^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{1,100}$`,
        substeps: [],
        options: [],
        help: [],
        conditions: []
    },
    {
        id: 24,
        step_name: "Phone",
        description: null,
        json_key: "phone",
        input_type: "text",
        placeholder: null,
        required: true,
        parent: 15,
        validation_regex: String.raw`^\+?[1-9]\d{8,14}$`,
        substeps: [],
        options: [],
        help: [],
        conditions: []
    },
    {
        id: 25,
        step_name: "E-mail",
        description: null,
        json_key: "email",
        input_type: "text",
        placeholder: null,
        required: true,
        parent: 15,
        validation_regex: String.raw`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`,
        substeps: [],
        options: [],
        help: [],
        conditions: []
    },
    {
        id: 26,
        step_name: "Postcode",
        description: null,
        json_key: "postcode",
        input_type: "text",
        placeholder: null,
        required: true,
        parent: 15,
        validation_regex: String.raw`^([A-Za-z0-9\\s-]{3,10})$`,
        substeps: [],
        options: [],
        help: [],
        conditions: []
    }
    ],
    options: [],
    help: [],
    conditions: []
};