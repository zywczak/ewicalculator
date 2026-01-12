import { StepsData } from './types';

import { STEP_1_HOUSE } from './steps/step1-houseType';
import { STEP_2_SURFACE } from './steps/step2-surface';
import { STEP_3_SIZE } from './steps/step3-size';
import { STEP_4_SYSTEM_TYPE } from './steps/step4-systemType';
import { STEP_5_INSULATION } from './steps/step5-insulationType';
import { STEP_6_THICKNESS } from './steps/step6-thickness';
import { STEP_7_FIXINGS } from './steps/step7-fixings';
import { STEP_8_BEADS } from './steps/step8-beadsTrims';
import { STEP_9_RENDER } from './steps/step9-renderType';
import { STEP_10_GRAIN } from './steps/step10-grainSize';
import { STEP_11_COLOUR } from './steps/step11-colour';
import { STEP_12_ADDITIONAL } from './steps/step12-additionalProducts';
import { STEP_13_CUSTOMER } from './steps/step13-customerDetails';

export const STEPS_DATA: StepsData = {
  total_steps: 13,
  steps: [
    STEP_1_HOUSE,
    STEP_2_SURFACE,
    STEP_3_SIZE,
    STEP_4_SYSTEM_TYPE,
    STEP_5_INSULATION,
    STEP_6_THICKNESS,
    STEP_7_FIXINGS,
    STEP_8_BEADS,
    STEP_9_RENDER,
    STEP_10_GRAIN,
    STEP_11_COLOUR,
    STEP_12_ADDITIONAL,
    STEP_13_CUSTOMER,
  ],
};

export default STEPS_DATA;
