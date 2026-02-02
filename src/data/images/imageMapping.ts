import { StepOptionImage } from "./types";
import OPTION_IDS from "../constants/optionIds";

export const STEP_OPTION_IMAGES: StepOptionImage[] = [
  
  // Default images per house type (tylko typ domu wybrany)
  { image_url: "/media/detacheddefault.jpg", options: [OPTION_IDS.HOUSE.DETACHED] },
  { image_url: "/media/semidetacheddefault.jpg", options: [OPTION_IDS.HOUSE.SEMI_DETACHED] },
  { image_url: "/media/terraceddefault.jpg", options: [OPTION_IDS.HOUSE.TERRACED] },

  // Surface materials - DETACHED
  { image_url: "/media/detachedbrick.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.SURFACE.BRICK] },
  { image_url: "/media/detachedstone.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.SURFACE.STONE] },
  { image_url: "/media/detachedpaintedbrick.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.SURFACE.PAINTED_BRICK] },
  { image_url: "/media/detachedblock.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.SURFACE.BLOCK] },
  { image_url: "/media/detachedpebbledash.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.SURFACE.PEBBLEDASH] },
  { image_url: "/media/detachedicf.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.SURFACE.ICF] },
  { image_url: "/media/detachedrendercarrierboard.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.SURFACE.RENDER_CARRIER] },
  { image_url: "/media/detachedsandandcement.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.SURFACE.SAND_CEMENT] },
  
  // Surface materials - TERRACED
  { image_url: "/media/terracedbrick.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.SURFACE.BRICK], mask_url: "/media/terracedbrickmask.png" },
  { image_url: "/media/terracedblock.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.SURFACE.BLOCK], mask_url: "/media/terracedblockmask.png" },
  { image_url: "/media/terraceedicf.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.SURFACE.ICF], mask_url: "/media/terraceedicfmask.png" },
  { image_url: "/media/terracedstone.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.SURFACE.STONE], mask_url: "/media/terracedstonemask.png" },
  { image_url: "/media/terracedpaintedbrick.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.SURFACE.PAINTED_BRICK], mask_url: "/media/terracedpaintedbrickmask.png" },
  { image_url: "/media/terracedpebbledash.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.SURFACE.PEBBLEDASH], mask_url: "/media/terracedpebbledashmask.png" },
  { image_url: "/media/terracedsandandcementrender.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.SURFACE.SAND_CEMENT], mask_url: "/media/terracedsandandcementrendermask.png" },
  { image_url: "/media/terracedrendercarrierboard.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.SURFACE.RENDER_CARRIER], mask_url: "/media/terracedrendercarrierboardmask.png" },
  
  // Surface materials - SEMI-DETACHED
  { image_url: "/media/semidetachedbrick.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.SURFACE.BRICK], mask_url: "/media/semidetachedbrickmask.png" },
  { image_url: "/media/semidetachedicf.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.SURFACE.ICF], mask_url: "/media/semidetachedicfmask.png" },
  { image_url: "/media/semidetachedstone.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.SURFACE.STONE], mask_url: "/media/semidetachedstonemask.png" },
  { image_url: "/media/semidetachedpaintedbrick.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.SURFACE.PAINTED_BRICK], mask_url: "/media/semidetachedpaintedbrickmask.png" },
  { image_url: "/media/semidetachedblock.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.SURFACE.BLOCK], mask_url: "/media/semidetachedblockmask.png" },
  { image_url: "/media/semidetachedpebbledash.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.SURFACE.PEBBLEDASH], mask_url: "/media/semidetachedpebbledashmask.png" },
  { image_url: "/media/semidetachedrendercarrierboard.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.SURFACE.RENDER_CARRIER], mask_url: "/media/semidetachedrendercarrierboardmask.png" },
  { image_url: "/media/semidetachedsandandcement.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.SURFACE.SAND_CEMENT], mask_url: "/media/semidetachedsandandcementmask.png" },

  // Insulation materials - DETACHED
  { image_url: "/media/detachedmaterialepsthick.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.INSULATION.EPS] },
  { image_url: "/media/detachedmaterialkingspanthick.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.INSULATION.KINGSPAN] },
  { image_url: "/media/detachedmaterialwoolthick.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.INSULATION.WOOL] },

  // Insulation materials - TERRACED
  { image_url: "/media/terracedmaterialepsthick.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.INSULATION.EPS] },
  { image_url: "/media/terracedmaterialkingspanthick.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.INSULATION.KINGSPAN] },
  { image_url: "/media/terracedmaterialwoolthick.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.INSULATION.WOOL] },

  // Insulation materials - SEMI-DETACHED
  { image_url: "/media/semidetachedmaterialepsthick.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.INSULATION.EPS] },
  { image_url: "/media/semidetachedmaterialkingspanthick.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.INSULATION.KINGSPAN] },
  { image_url: "/media/semidetachedmaterialwoolthick.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.INSULATION.WOOL] },

  // Fixings - DETACHED
  { image_url: "/media/detachedfixingsplasticthick.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.FIXINGS.PLASTIC] },
  { image_url: "/media/detachedfixingsmetalthick.png", options: [OPTION_IDS.HOUSE.DETACHED, OPTION_IDS.FIXINGS.METAL] },

  // Fixings - TERRACED
  { image_url: "/media/terracedfixingsplasticthick.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.FIXINGS.PLASTIC] },
  { image_url: "/media/terracedfixingsmetalthick.png", options: [OPTION_IDS.HOUSE.TERRACED, OPTION_IDS.FIXINGS.METAL] },

  // Fixings - SEMI-DETACHED
  { image_url: "/media/semidetachedfixingsplasticthick.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.FIXINGS.PLASTIC] },
  { image_url: "/media/semidetachedfixingsmetalthick.png", options: [OPTION_IDS.HOUSE.SEMI_DETACHED, OPTION_IDS.FIXINGS.METAL] },
];

export const HOUSE_TYPE_IMAGES = {
  DETACHED: OPTION_IDS.HOUSE.DETACHED,
  SEMI_DETACHED: OPTION_IDS.HOUSE.SEMI_DETACHED,
  TERRACED: OPTION_IDS.HOUSE.TERRACED,
};

export default STEP_OPTION_IMAGES;
