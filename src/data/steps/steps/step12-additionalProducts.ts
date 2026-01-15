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
        json_key: "levelling-coat\n",
        input_type: "number",
        placeholder: "no. of bags",
        required: null,
        parent: 4,
        validation_regex: null,
        substeps: [],
        options: [],
        help: [],
        conditions: []
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
        conditions: []
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
        conditions: []
    },
    {
        id: 30,
        step_name: "Any orange tape required (100m rolls)",
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
        conditions: []
    }
    ],
    options: [],
    help: [],
    conditions: []
};
