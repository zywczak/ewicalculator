export const OPTION_IDS = {
  HOUSE: {
    TERRACED: 1,
    SEMI_DETACHED: 2,
    DETACHED: 3,
  },

  SURFACE: {
    STONE: 6,
    RENDER_CARRIER: 7,
    ICF: 8,
    SAND_CEMENT: 9,
    PEBBLEDASH: 10,
    BLOCK: 11,
    PAINTED_BRICK: 12,
    BRICK: 13,
  },

  SYSTEM_TYPE: {
    INSULATION_AND_RENDER: 4,
    RENDER_ONLY: 5,
  },

  INSULATION: {
    KINGSPAN: 18,
    EPS: 19,
    WOOL: 20,
  },

  THICKNESS: {
    "20MM": 31,
    "50MM": 30,
    "60MM": 29,
    "70MM": 28,
    "90MM": 27,
    "100MM": 33,
    "110MM": 32,
    "150MM": 34,
  },

  GRAINSIZE: {
    "3MM": 37,
    "2MM": 38,
    "1_5MM": 39,
    "1MM": 40,
    "0_5MM": 41,
  },

  COLOURS: {
    LILAC: 45,
    GREY: 46,
    GOLD: 47,
    BLACK: 48,
  },

  STARTER_TRACKS: {
    METAL: 42,
    PLASTIC: 43,
  },

  FIXINGS: {
    PLASTIC: 35,
    METAL: 36,
    SCREW: 50,
  },

  RENDER_TYPE: {
    SILICONE_SILICATE: 14,
    SILICONE: 15,
    PREMIUM_BIO: 16,
    NANO_DREX: 17,
    BRICK_SLIPS: 44,
  },
} as const;

export default OPTION_IDS;
