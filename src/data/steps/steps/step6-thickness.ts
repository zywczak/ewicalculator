import OPTION_IDS from "../../constants/optionIds";
import { HELP_TABLES } from "../../helpTables/tables";
import { FormStep } from "../types";

export const STEP_6_THICKNESS: FormStep = {
    id: 6,
    step_name: "Thickness of Insulation",
    description: null,
    json_key: "thickness",
    input_type: "radio",
    placeholder: null,
    required: true,
    parent: null,
    validation_regex: null,
    substeps: [],
    options: [
    { 
        id: OPTION_IDS.THICKNESS["25MM"], 
        option_value: "25 mm", 
        json_value: 25, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.KINGSPAN],
    },
    { 
        id: OPTION_IDS.THICKNESS["50MM"], 
        option_value: "50 mm", 
        json_value: 50, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOL, OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.KINGSPAN],
    },
    { 
        id: OPTION_IDS.THICKNESS["60MM"], 
        option_value: "60 mm", 
        json_value: 60, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.KINGSPAN],
    },
    { 
        id: OPTION_IDS.THICKNESS["70MM"], 
        option_value: "70 mm", 
        json_value: 70, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.KINGSPAN],
    },
    { 
        id: OPTION_IDS.THICKNESS["90MM"], 
        option_value: "90 mm", 
        json_value: 90, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.WOOL],
    },
    { 
        id: OPTION_IDS.THICKNESS["100MM"], 
        option_value: "100 mm", 
        json_value: 100, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOL, OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.WOOD_FIBRE],
    },
    { 
        id: OPTION_IDS.THICKNESS["110MM"], 
        option_value: "110 mm", 
        json_value: 110, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOL],
    },
    { 
        id: OPTION_IDS.THICKNESS["120MM"], 
        option_value: "120 mm", 
        json_value: 120, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOD_FIBRE],
    },
    { 
        id: OPTION_IDS.THICKNESS["140MM"], 
        option_value: "140 mm", 
        json_value: 140, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOD_FIBRE],
    },
    { 
        id: OPTION_IDS.THICKNESS["150MM"], 
        option_value: "150 mm", 
        json_value: 150, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOL, OPTION_IDS.INSULATION.EPS],
    },
    { 
        id: OPTION_IDS.THICKNESS["160MM"], 
        option_value: "160 mm", 
        json_value: 160, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOD_FIBRE],
    },
    { 
        id: OPTION_IDS.THICKNESS["200MM"], 
        option_value: "200 mm", 
        json_value: 200, 
        image: null, 
        parent_option_id: [OPTION_IDS.INSULATION.WOOD_FIBRE],
    },
    ],
    help: [
    {
        help_title: "Thickness of Insulation",
        upper_description: null,
        downer_description: "The term U-value is used to define the rate of heat loss through a material. The lower the u-value, the better the insulation product performance.<br /><br />U-value is measured in W/m2.K (Watts per metre squared Kelvin), and in the table below, you can see the different U-values based on the different insulation materials and thicknesses (based on applying the insulation to a solid brick wall).",
        images: [],
        table: HELP_TABLES.thickness
    }
    ],
    conditions: [],
};