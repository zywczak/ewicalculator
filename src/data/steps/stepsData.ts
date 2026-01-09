// src/data/steps/stepsData.ts

import { ReactNode } from 'react';
import { HELP_TABLES, SimpleTable } from '../tables/tables';
import { OPTION_IDS } from '../constants/optionIds';

// ============================================================================
// TYPES
// ============================================================================

export type InputType = 
  | 'radio' 
  | 'number' 
  | 'text' 
  | 'colour' 
  | null;

export type HeaderType = 'column' | 'row';

export type DataType = 
  | 'text' 
  | 'number' 
  | 'boolean' 
  | 'scale' 
  | null;

export interface FormStepOption {
  id: number;
  option_value: string;
  json_value: string | null;
  image: string | null;
  parent_option_id?: number[];
}

export interface HelpImage {
  image_name: string;
  caption: string | null;
  image_url: string;
  description: string | null;
}

export type DescriptionType = string | ReactNode | null;

export interface HelpSection {
  help_title: string;
  upper_description: DescriptionType;
  downer_description: DescriptionType;
  images?: HelpImage[];
  table?: SimpleTable;
  side_description?: string;
  disclaimer?: string;
  useColourSamples?: boolean;
}

export interface StepCondition {
  trigger_step: number;
  trigger_option: number;
  skip_steps: number[];
  show_steps?: number[];
}

export interface FormStep {
  id: number; //is also used as step order
  step_name: string | null;
  description: string | ReactNode | null;
  json_key: string;
  input_type: InputType;
  placeholder: string | null;
  required: boolean | null;
  parent: number | null;
  validation_regex: string | null;
  substeps: FormStep[];
  options: FormStepOption[];
  help: HelpSection[];
  conditions: StepCondition[];
}

export interface StepsData {
  total_steps: number;
  steps: FormStep[];
}

// ============================================================================
// HELPER: Parse description z HTML/JSX
// ============================================================================

export const parseDescription = (desc: string | ReactNode | null): string => {
  if (!desc || typeof desc !== 'string') return '';
  return desc;
};

// ============================================================================
// STEPS DATA - Główna konfiguracja formularza
// ============================================================================

export const STEPS_DATA: StepsData = {
  total_steps: 13,
  steps: [
    // ========================================================================
    // STEP 1: Type of House
    // ========================================================================
    {
      id: 1,
      step_name: "Type of house",
      description: "",
      json_key: "house",
      input_type: "radio",
      placeholder: null,
      required: true,
      parent: null,
      validation_regex: null,
      substeps: [],
      options: [
        { id: OPTION_IDS.HOUSE.DETACHED, option_value: "Detached", json_value: "1", image: null },
        { id: OPTION_IDS.HOUSE.SEMI_DETACHED, option_value: "Semi detached", json_value: "2", image: null },
        { id: OPTION_IDS.HOUSE.TERRACED, option_value: "Mid terrace", json_value: "3", image: null },        
      ],
      help: [],
      conditions: []
    },

    // ========================================================================
    // STEP 2: Surface Material
    // ========================================================================
    {
      id: 2,
      step_name: "What's it going on to?",
      description: null,
      json_key: "surfaceMaterial",
      input_type: "radio",
      placeholder: null,
      required: null,
      parent: null,
      validation_regex: null,
      substeps: [],
      options: [
        { id: OPTION_IDS.SURFACE.STONE, option_value: "Stone", json_value: "8", image: null },
        { id: OPTION_IDS.SURFACE.ICF, option_value: "ICF", json_value: "6", image: null },
        { id: OPTION_IDS.SURFACE.PEBBLEDASH, option_value: "Pebbledash", json_value: "4", image: null },
        { id: OPTION_IDS.SURFACE.BLOCK, option_value: "Blockwork", json_value: "3", image: null },
        { id: OPTION_IDS.SURFACE.BRICK, option_value: "Brick", json_value: "1", image: null },
        { id: OPTION_IDS.SURFACE.PAINTED_BRICK, option_value: "Painted brick", json_value: "2", image: null },
        { id: OPTION_IDS.SURFACE.SAND_CEMENT, option_value: "Sand & cement render", json_value: "5", image: null },
        { id: OPTION_IDS.SURFACE.RENDER_CARRIER, option_value: "Render carrier board", json_value: "7", image: null },
      ],
      help: [
        {
          help_title: "What's it going on to?",
          upper_description: "By letting us know what substrate the EWI Pro materials are being installed on, we can provide you with the correct primer (if required) - typically the primer helps aid adhesion and regulate absorption of the substrate.",
          downer_description: null,
          images: [
            { image_name: "stone.jpg", caption: "Stone", image_url: "/media/stone.jpg", description: null },
            { image_name: "sandandcement.jpg", caption: "Sand and Cement", image_url: "/media/sandandcement.jpg", description: null },
            { image_name: "rendercarrierboard.jpg", caption: "Render Carrier Board", image_url: "/media/rendercarrierboard.jpg", description: null },
            { image_name: "pebbledash.jpg", caption: "Pebbledash", image_url: "/media/pebbledash.jpg", description: null },
            { image_name: "paintedbrick.jpg", caption: "Painted Brick", image_url: "/media/paintedbrick.jpg", description: null },
            { image_name: "icf.jpg", caption: "ICF", image_url: "/media/icf.jpg", description: null },
            { image_name: "brick.jpg", caption: "Brick", image_url: "/media/brick.jpg", description: null },
            { image_name: "block.jpg", caption: "Block", image_url: "/media/block.jpg", description: null }
          ]
        }
      ],
      conditions: []
    },

    // ========================================================================
    // STEP 3: Size of Property
    // ========================================================================
    {
      id: 3,
      step_name: "Size of property",
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
          help_title: "The area",
          upper_description: "We do not recommend removing window + doors from your calculations.",
          downer_description: "<span style='color: #437A8E; font-size: 20px; display: block;'>It's easy</span><b style='font-size: 28px; display: block; font-weight: 700'>a x b = surface area</b>",
          images: [
            { image_name: "areadiagram.png", caption: null, image_url: "/media/areadiagram.png", description: null }
          ]
        }
      ],
      conditions: []
    },

    // ========================================================================
    // STEP 4: Insulation or Render Only
    // ========================================================================
    {
      id: 4,
      step_name: "Insulation or render only?",
      description: "",
      json_key: "type",
      input_type: "radio",
      placeholder: null,
      required: true,
      parent: null,
      validation_regex: null,
      substeps: [],
      options: [
        { id: OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, option_value: "Insulation & Render", json_value: "insulation&render", image: null },
        { id: OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY, option_value: "Render only", json_value: "render", image: null }
      ],
      help: [
        {
          help_title: "Advantages of insulation",
          upper_description: null,
          downer_description: null,
          images: [],
          table: HELP_TABLES.insulationVsRender
        }
      ],
      conditions: [
        { trigger_step: 4, trigger_option: OPTION_IDS.SYSTEM_TYPE.RENDER_ONLY, skip_steps: [5, 6, 7, 31] },
        { trigger_step: 4, trigger_option: OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, skip_steps: [21] },
      ]
    },

    // ========================================================================
    // STEP 5: Type of Insulation
    // ========================================================================
    {
      id: 5,
      step_name: "Type of insulation",
      description: null,
      json_key: "insulationType",
      input_type: "radio",
      placeholder: null,
      required: true,
      parent: null,
      validation_regex: null,
      substeps: [],
      options: [
        { id: OPTION_IDS.INSULATION.KINGSPAN, option_value: "Kingspan k5", json_value: "Kingspan", image: "/media/kingspan.png" },
        { id: OPTION_IDS.INSULATION.EPS, option_value: "EPS", json_value: "EPS", image: "/media/eps.png" },
        { id: OPTION_IDS.INSULATION.WOOL, option_value: "Mineral wool", json_value: "Wool", image: "/media/mineralwool.png" }
      ],
      help: [
        {
          help_title: "Type of insulation",
          upper_description: "We offer three main types of insulation material - EPS, Mineral Wool (Rockwool) and Kingspan K5, which all have slightly different properties.",
          downer_description: null,
          images: [],
          table: HELP_TABLES.insulationType
        }
      ],
      conditions: []
    },

    // ========================================================================
    // STEP 6: Thickness of Insulation
    // ========================================================================
    {
      id: 6,
      step_name: "Thickness of insulation",
      description: null,
      json_key: "thickness",
      input_type: "radio",
      placeholder: null,
      required: true,
      parent: null,
      validation_regex: null,
      substeps: [],
      options: [
        { id: OPTION_IDS.THICKNESS["20MM"], option_value: "20 mm", json_value: null, image: null, parent_option_id: [OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.KINGSPAN] },
        { id: OPTION_IDS.THICKNESS["50MM"], option_value: "50 mm", json_value: null, image: null, parent_option_id: [OPTION_IDS.INSULATION.WOOL, OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.KINGSPAN] },
        { id: OPTION_IDS.THICKNESS["60MM"], option_value: "60 mm", json_value: null, image: null, parent_option_id: [OPTION_IDS.INSULATION.KINGSPAN] },
        { id: OPTION_IDS.THICKNESS["70MM"], option_value: "70 mm", json_value: null, image: null, parent_option_id: [OPTION_IDS.INSULATION.EPS, OPTION_IDS.INSULATION.KINGSPAN] },
        { id: OPTION_IDS.THICKNESS["90MM"], option_value: "90 mm", json_value: null, image: null, parent_option_id: [OPTION_IDS.INSULATION.EPS] },
        { id: OPTION_IDS.THICKNESS["100MM"], option_value: "100 mm", json_value: null, image: null, parent_option_id: [OPTION_IDS.INSULATION.WOOL, OPTION_IDS.INSULATION.EPS] },
        { id: OPTION_IDS.THICKNESS["110MM"], option_value: "110 mm", json_value: null, image: null, parent_option_id: [OPTION_IDS.INSULATION.WOOL] },
        { id: OPTION_IDS.THICKNESS["150MM"], option_value: "150 mm", json_value: null, image: null, parent_option_id: [OPTION_IDS.INSULATION.WOOL, OPTION_IDS.INSULATION.EPS] }
      ],
      help: [
        {
          help_title: "Thickness of insulation",
          upper_description: null,
          downer_description: `The term U-value is used to define the rate of heat loss through a material. <b>The lower the u-value, the better the insulation product performance.</b><br/><br/>U-value is measured in W/m<sup>2</sup>.K (Watts per metre squared Kelvin) and in the table below you can see the different u-values based on the different insulation materials and thicknesses (based on applying the insulation to a solid brick wall).`,
          images: [],
          table: HELP_TABLES.thickness
        }
      ],
      conditions: [{ trigger_step: 6, trigger_option: OPTION_IDS.THICKNESS["20MM"], skip_steps: [7] }]
    },

    // ========================================================================
    // STEP 7: Fixings Type
    // ========================================================================
    {
      id: 7,
      step_name: "Type of fixings",
      description: null,
      json_key: "fixings",
      input_type: "radio",
      placeholder: null,
      required: null,
      parent: null,
      validation_regex: null,
      substeps: [],
      options: [
        { id: OPTION_IDS.FIXINGS.PLASTIC, option_value: "Plastic", json_value: "2", image: "/media/plasticfixing.png" },
        { id: OPTION_IDS.FIXINGS.METAL, option_value: "Metal", json_value: "1", image: "/media/metalfixing.png" },
        { id: OPTION_IDS.FIXINGS.SCREW, option_value: "Screw", json_value: "3", image: "/media/screwfixing.png" }
      ],
      help: [
        {
          help_title: "Type of mechanical Fixings",
          upper_description: null,
          downer_description: `When you install our external wall insulation systems, the insulation boards are held in place with both adhesive and mechanical fixings.<br/><br/>We offer two types of fixing – metal or plastic pin and both types are available in 4 different lengths depending on the thickness of the insusulation used.<br/><br/>We recommend that the fixing is always <strong>50mm longer</strong> than the thickness of the insulation used to ensure it is anchored securely to the wall.`,
          images: [
            { image_name: "fixings.jpg", caption: null, image_url: "/media/fixings.jpg", description: null }
          ]
        }
      ],
      conditions: []
    },

    // ========================================================================
    // STEP 8: Beads & Trims
    // ========================================================================
    {
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
    },

    // ========================================================================
    // STEP 9: Type of System (Render Type)
    // ========================================================================
    {
      id: 9,
      step_name: "Type of the system",
      description: null,
      json_key: "system",
      input_type: "radio",
      placeholder: null,
      required: true,
      parent: null,
      validation_regex: null,
      substeps: [],

      options: [
        { id: OPTION_IDS.RENDER_TYPE.NANO_DREX, option_value: "Nano Drex Silicone", json_value: "6", image: "/media/nanodrex.png" },
        { id: OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, option_value: "Premium Bio Silicone", json_value: "5", image: "/media/premiumbio.png" },
        { id: OPTION_IDS.RENDER_TYPE.SILICONE, option_value: "Silicone", json_value: "1", image: "/media/silicone.png" },
        { id: OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, option_value: "Silicone Silicate", json_value: "2", image: "/media/siliconesilicate.png" },
        { id: OPTION_IDS.RENDER_TYPE.BRICK_SLIPS, option_value: "Brick Slips", json_value: "7", image: "/media/brickslips.png" }
      ],
      help: [
        {
          help_title: "Type of Render",
          upper_description: null,
          downer_description: null,
          images: [],
          table: HELP_TABLES.renderType
        }
      ],
      conditions: [
        { trigger_step: 9, trigger_option: OPTION_IDS.RENDER_TYPE.BRICK_SLIPS, skip_steps: [10] }
      ]
    },

    // ========================================================================
    // STEP 10: Render Grain Size
    // ========================================================================
    {
      id: 10,
      step_name: "Render grain size",
      description: null,
      json_key: "grainsize",
      input_type: "radio",
      placeholder: null,
      required: null,
      parent: null,
      validation_regex: null,
      substeps: [],
      options: [
        { id: OPTION_IDS.GRAINSIZE["0_5MM"], option_value: "0.5 mm", json_value: "0.5", image: null, parent_option_id: [OPTION_IDS.RENDER_TYPE.SILICONE] },
        { id: OPTION_IDS.GRAINSIZE["1MM"], option_value: "1 mm", json_value: "1", image: null, parent_option_id: [OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.RENDER_TYPE.SILICONE] },
        { id: OPTION_IDS.GRAINSIZE["1_5MM"], option_value: "1.5 mm", json_value: "1.5", image: null, parent_option_id: [OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, OPTION_IDS.RENDER_TYPE.SILICONE] },
        { id: OPTION_IDS.GRAINSIZE["2MM"], option_value: "2 mm", json_value: "2", image: null, parent_option_id: [OPTION_IDS.RENDER_TYPE.SILICONE] },
        { id: OPTION_IDS.GRAINSIZE["3MM"], option_value: "3 mm", json_value: "3", image: null, parent_option_id: [OPTION_IDS.RENDER_TYPE.SILICONE] },
      ],
      help: [
        {
          help_title: "Render grain size",
          upper_description: null,
          downer_description: "Our renders are available in 5 different grains thicknesses. Render samples available online and in-store are in 1.0mm and 1.5mm sizes.",
          side_description:  "We offer 5 grain sizes, 0.5mm, 1mm, 1.5mm, 2mm and 3mm depending on the finish required. <br /> <b>Silicone, Silicone-Silicate, Nano Drex Silicone, Premium Bio Silicone</b>",
          images: [
            {
              image_name: "bellcastbead.png",
              caption: "0.5 mm",
              image_url: "/media/bellcastbead.png",
              description: null
            },
            {
              image_name: "bellcastbead.png",
              caption: "1 mm",
              image_url: "/media/bellcastbead.png",
              description: null
            },
            {
              image_name: "stopbead.png",
              caption: "1.5 mm",
              image_url: "/media/stopbead.png",
              description: null
            },
            {
              image_name: "cornerbead.png",
              caption: "2 mm",
              image_url: "/media/cornerbead.png",
              description: null
            },
            {
              image_name: "startertrack.png",
              caption: "3 mm",
              image_url: "/media/startertrack.png",
              description: null
            },
          ]
        }
      ],
      conditions: []
    },

    // ========================================================================
    // STEP 11: Colour Selection
    // ========================================================================
    {
      id: 11,
      step_name: "Select colour",
      description: null,
      json_key: "colour",
      input_type: "colour",
      placeholder: null,
      required: null,
      parent: null,
      validation_regex: null,
      substeps: [],
      options: [
        { id: OPTION_IDS.COLOURS.LILAC, option_value: "#C8A2C8", json_value: "#C8A2C8", image: null },
        { id: OPTION_IDS.COLOURS.GREY, option_value: "#5B5D74", json_value: "#5B5D74", image: null },
        { id: OPTION_IDS.COLOURS.GOLD, option_value: "#D4C279", json_value: "#D4C279", image: null },
        { id: OPTION_IDS.COLOURS.BLACK, option_value: "#000000", json_value: "#000000", image: null }
      ],
      // options: [],
      help: [
        {
          help_title: "The colours",
          upper_description: null,
          downer_description: "<b>This is only preview</b> <br />For best matching or colour find, order one of our samples, or visit our store. <br />We offer 50 most popular colours in stock. <br /><br />For better user experience, we offer render samples: <ul><li>colour chart books</li><li>render sample sleeves</li><li>sample pots with render</li></ul>",
          useColourSamples: true,
          disclaimer:  "Disclaimer: Render colours may appear differently on-screen compared to real life. Therefore, we always recommend that you order a colour sample before making a final decision.",
        }
      ],
      conditions: []
    },

    // ========================================================================
    // STEP 12: Additional Products
    // ========================================================================
    {
      id: 12,
      step_name: "Additional products",
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
    },

    // ========================================================================
    // STEP 13: Customer Details
    // ========================================================================
    {
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
    }
  ]
};

export default STEPS_DATA;