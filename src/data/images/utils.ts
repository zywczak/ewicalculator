import OPTION_IDS from "../constants/optionIds";

export const getHouseTypeFromOptions = (selectedOptions: number[]): number | null => {
  if (selectedOptions.includes(OPTION_IDS.HOUSE.DETACHED)) {
    return OPTION_IDS.HOUSE.DETACHED;
  }
  if (selectedOptions.includes(OPTION_IDS.HOUSE.SEMI_DETACHED)) {
    return OPTION_IDS.HOUSE.SEMI_DETACHED;
  }
  if (selectedOptions.includes(OPTION_IDS.HOUSE.TERRACED)) {
    return OPTION_IDS.HOUSE.TERRACED;
  }
  return null;
};

