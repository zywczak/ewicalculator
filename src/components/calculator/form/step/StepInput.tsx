import React from "react";
import { FormStep } from "../../../../data/steps/stepsData";
import RadioStepInput from "./inputs/RadioStepInput";
import TextStepInput from "./inputs/TextStepInput";
import NumberStepInput from "./inputs/NumberStepInput";
import ColourStepInput from "./inputs/ColourStepInput";

export interface StepInputProps {
  step: FormStep;
  value: string | number;
  onChange: (value: string | number, optionId?: number) => void;
  onErrorChange?: (hasError: boolean) => void;
  isSubstep?: boolean;
  label?: string;
  isMobile?: boolean;
}

const StepInput: React.FC<StepInputProps> = (props) => {
  const { step } = props;
  if (!step.input_type) return null;

  switch (step.input_type) {
    case "radio":
      return <RadioStepInput {...props} />;
    case "text":
      return <TextStepInput {...props} />;
    case "number":
      return <NumberStepInput {...props} />;
    case "colour":
      return <ColourStepInput {...props} />;
    default:
      return null;
  }
};

export default StepInput;