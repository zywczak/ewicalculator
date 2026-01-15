import { StepOptionImage } from "./types";
import OPTION_IDS from "../constants/optionIds";

export const STEP_OPTION_IMAGES: StepOptionImage[] = [
  
  // Main Layer - Default images per house type
  { layer: "main", image_url: "/media/detacheddefault.jpg", options: [OPTION_IDS.HOUSE.DETACHED] },

  { layer: "main", image_url: "/media/semidetacheddefault.jpg", options: [OPTION_IDS.HOUSE.SEMI_DETACHED] },
  
  { layer: "main", image_url: "/media/terraceddefault.jpg", options: [OPTION_IDS.HOUSE.TERRACED] },

  // Second Layer - Surface materials
  { layer: "second", image_url: "/media/detachedbrick.png", options: [OPTION_IDS.SURFACE.BRICK, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "second", image_url: "/media/detachedstone.png", options: [OPTION_IDS.SURFACE.STONE, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "second", image_url: "/media/detachedpaintedbrick.png", options: [OPTION_IDS.SURFACE.PAINTED_BRICK, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "second", image_url: "/media/detachedblock.png", options: [OPTION_IDS.SURFACE.BLOCK, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "second", image_url: "/media/detachedpebbledash.png", options: [OPTION_IDS.SURFACE.PEBBLEDASH, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "second", image_url: "/media/detachedicf.png", options: [OPTION_IDS.SURFACE.ICF, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "second", image_url: "/media/detachedrendercarrierboard.png", options: [OPTION_IDS.SURFACE.RENDER_CARRIER, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "second", image_url: "/media/detachedsandandcement.png", options: [OPTION_IDS.SURFACE.SAND_CEMENT, OPTION_IDS.HOUSE.DETACHED] },
  
  { layer: "second", image_url: "/media/terracedbrick.png", options: [OPTION_IDS.SURFACE.BRICK, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "second", image_url: "/media/terracedblock.png", options: [OPTION_IDS.SURFACE.BLOCK, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "second", image_url: "/media/terracedicf.png", options: [OPTION_IDS.SURFACE.ICF, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "second", image_url: "/media/terracedstone.png", options: [OPTION_IDS.SURFACE.STONE, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "second", image_url: "/media/terracedpaintedbrick.png", options: [OPTION_IDS.SURFACE.PAINTED_BRICK, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "second", image_url: "/media/terracedpebbledash.png", options: [OPTION_IDS.SURFACE.PEBBLEDASH, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "second", image_url: "/media/terracedsandandcementrender.png", options: [OPTION_IDS.SURFACE.SAND_CEMENT, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "second", image_url: "/media/terracedrendercarrierboard.png", options: [OPTION_IDS.SURFACE.RENDER_CARRIER, OPTION_IDS.HOUSE.TERRACED] },
  
  { layer: "second", image_url: "/media/semidetachedbrick.png", options: [OPTION_IDS.SURFACE.BRICK, OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { layer: "second", image_url: "/media/semidetachedicf.png", options: [OPTION_IDS.SURFACE.ICF, OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { layer: "second", image_url: "/media/semidetachedstone.png", options: [OPTION_IDS.SURFACE.STONE, OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { layer: "second", image_url: "/media/semidetachedpaintedbrick.png", options: [OPTION_IDS.SURFACE.PAINTED_BRICK, OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { layer: "second", image_url: "/media/semidetachedblock.png", options: [OPTION_IDS.SURFACE.BLOCK, OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { layer: "second", image_url: "/media/semidetachedpebbledash.png", options: [OPTION_IDS.SURFACE.PEBBLEDASH, OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { layer: "second", image_url: "/media/semidetachedrendercarrierboard.png", options: [OPTION_IDS.SURFACE.RENDER_CARRIER, OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { layer: "second", image_url: "/media/semidetachedsandandcement.png", options: [OPTION_IDS.SURFACE.SAND_CEMENT, OPTION_IDS.HOUSE.SEMI_DETACHED] },

  // Third Layer - Insulation materials (thick variants)  
  { layer: "third", image_url: "/media/detachedmaterialkingspanthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.INSULATION.KINGSPAN, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "third", image_url: "/media/detachedmaterialepsthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.INSULATION.EPS, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "third", image_url: "/media/detachedmaterialwoolthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.INSULATION.WOOL, OPTION_IDS.HOUSE.DETACHED] },
  
  { layer: "third", image_url: "/media/semidetachedmaterialkingspanthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.INSULATION.KINGSPAN, OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { layer: "third", image_url: "/media/semidetachedmaterialepsthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.INSULATION.EPS, OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { layer: "third", image_url: "/media/semidetachedmaterialwoolthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.INSULATION.WOOL, OPTION_IDS.HOUSE.SEMI_DETACHED] },
  
  { layer: "third", image_url: "/media/terracedmaterialkingspanthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.INSULATION.KINGSPAN, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "third", image_url: "/media/terracedmaterialepsthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.INSULATION.EPS, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "third", image_url: "/media/terracedmaterialwoolthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.INSULATION.WOOL, OPTION_IDS.HOUSE.TERRACED] },
  
  // Fourth Layer - Fixings
  { layer: "fourth", image_url: "/media/detachedfixingsmetalthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.FIXINGS.METAL, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "fourth", image_url: "/media/detachedfixingsplasticthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.FIXINGS.PLASTIC, OPTION_IDS.HOUSE.DETACHED] },

  { layer: "fourth", image_url: "/media/semidetachedfixingsmetalthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.FIXINGS.METAL, OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { layer: "fourth", image_url: "/media/semidetachedfixingsplasticthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.FIXINGS.PLASTIC, OPTION_IDS.HOUSE.SEMI_DETACHED] },

  { layer: "fourth", image_url: "/media/terracedfixingsmetalthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.FIXINGS.METAL, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "fourth", image_url: "/media/terracedfixingsplasticthick.png", options: [OPTION_IDS.SYSTEM_TYPE.INSULATION_AND_RENDER, OPTION_IDS.FIXINGS.PLASTIC, OPTION_IDS.HOUSE.TERRACED] },
  
  // Fifth Layer - Colour masks
  { layer: "fifth", image_url: "/media/terracedmask.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "fifth", image_url: "/media/terracedmask.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "fifth", image_url: "/media/terracedmask.png", options: [OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "fifth", image_url: "/media/terracedmask.png", options: [OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "fifth", image_url: "/media/terracedmask.png", options: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS,OPTION_IDS.HOUSE.TERRACED] },
  
  { layer: "fifth", image_url: "/media/detachedmask.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "fifth", image_url: "/media/detachedmask.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "fifth", image_url: "/media/detachedmask.png", options: [OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "fifth", image_url: "/media/detachedmask.png", options: [OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "fifth", image_url: "/media/detachedmask.png", options: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS, OPTION_IDS.HOUSE.DETACHED] },

  // Sixth Layer - Render textures
  { layer: "sixth", image_url: "/media/terracedbricktexture.png", options: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "sixth", image_url: "/media/terracedrendertexture.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "sixth", image_url: "/media/terracedrendertexture.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "sixth", image_url: "/media/terracedrendertexture.png", options: [OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "sixth", image_url: "/media/terracedrendertexture.png", options: [OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.HOUSE.TERRACED] },
  
  { layer: "sixth", image_url: "/media/detachedbricktexture.png", options: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "sixth", image_url: "/media/detachedrendertexture.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "sixth", image_url: "/media/detachedrendertexture.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "sixth", image_url: "/media/detachedrendertexture.png", options: [OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "sixth", image_url: "/media/detachedrendertexture.png", options: [OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.HOUSE.DETACHED] },
  
  // Seventh Layer - Shadows
  { layer: "seventh", image_url: "/media/terracedshadow.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "seventh", image_url: "/media/terracedshadow.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "seventh", image_url: "/media/terracedshadow.png", options: [OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "seventh", image_url: "/media/terracedshadow.png", options: [OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.HOUSE.TERRACED] },
  { layer: "seventh", image_url: "/media/terracedshadow.png", options: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS, OPTION_IDS.HOUSE.TERRACED,] },
  
  { layer: "seventh", image_url: "/media/detachedshadow.png", options: [OPTION_IDS.RENDER_TYPE.BRICK_SLIPS, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "seventh", image_url: "/media/detachedshadow.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE_SILICATE, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "seventh", image_url: "/media/detachedshadow.png", options: [OPTION_IDS.RENDER_TYPE.SILICONE, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "seventh", image_url: "/media/detachedshadow.png", options: [OPTION_IDS.RENDER_TYPE.PREMIUM_BIO, OPTION_IDS.HOUSE.DETACHED] },
  { layer: "seventh", image_url: "/media/detachedshadow.png", options: [OPTION_IDS.RENDER_TYPE.NANO_DREX, OPTION_IDS.HOUSE.DETACHED] },

  // Eighth Layer - Scenery (thin variants)
  { layer: "eighth", image_url: "/media/detachedscenerythin.png", options: [OPTION_IDS.HOUSE.DETACHED] },
  { layer: "eighth", image_url: "/media/semidetachedscenerythin.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { layer: "eighth", image_url: "/media/terracedscenerythin.png", options: [OPTION_IDS.HOUSE.TERRACED] }
];

export default STEP_OPTION_IMAGES;