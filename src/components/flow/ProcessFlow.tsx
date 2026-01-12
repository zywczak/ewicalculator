import React from 'react';
import { Box } from '@mui/material';
import ProcessStep from './ProcessStep';
import { FormStep } from '../../data/steps/types';

interface ProcessFlowProps {
  currentStep: number;
  totalSteps: number;
  steps: FormStep[];
  onStepClick: (stepIndex: number) => void;
  completedSteps: Set<number>;
  isCurrentStepComplete: boolean;
  isCurrentStepRequired: boolean;
  selectedOptions: number[];
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ currentStep, totalSteps, steps, onStepClick, completedSteps, isCurrentStepComplete, isCurrentStepRequired, selectedOptions }) => {
  const isStepSkipped = (stepIndex: number) => {
    const step = steps[stepIndex];
    return steps
      .slice(0, stepIndex)
      .some(prevStep =>
        prevStep.conditions?.some(cond =>
          cond.skip_steps.includes(step.id) &&
          selectedOptions.includes(cond.trigger_option)
        )
      );
  };

  let firstIncompleteRequiredStep = totalSteps;
  for (let i = 0; i < totalSteps; i++) {
    const step = steps[i];
    const isRequired = step.required !== false;
    const isCompleted = completedSteps.has(i);
    const isCurrent = i === currentStep;
    const isSkipped = isStepSkipped(i);

    if (isSkipped) continue;

    if (isRequired && !isCompleted && !isCurrent) {
      firstIncompleteRequiredStep = i;
      break;
    }
  }

  type StepStatus = "disabled" | "enabled" | "current" | "clickable";

  const getNextNonSkippedStep = (
    start: number,
    totalSteps: number,
    isStepSkipped: (i: number) => boolean
  ): number => {
    let index = start;
    while (index < totalSteps && isStepSkipped(index)) {
      index++;
    }
    return index;
  };

  const getStepStatus = (
    i: number,
    currentStep: number,
    totalSteps: number,
    isStepSkipped: (i: number) => boolean,
    isCurrentStepComplete: boolean,
    isCurrentStepRequired: boolean,
    firstIncompleteRequiredStep: number
  ): StepStatus => {
    if (isStepSkipped(i)) {
      return "disabled";
    }

    if (i < currentStep) {
      return "enabled";
    }

    if (i === currentStep) {
      return "current";
    }

    const nextNonSkippedStep = getNextNonSkippedStep(
      currentStep + 1,
      totalSteps,
      isStepSkipped
    );

    if (
      i === nextNonSkippedStep &&
      (isCurrentStepComplete || !isCurrentStepRequired)
    ) {
      return "clickable";
    }

    if (i > nextNonSkippedStep && i <= firstIncompleteRequiredStep) {
      return "clickable";
    }

    return "disabled";
  };

  const processSteps = Array.from({ length: totalSteps }, (_, i) => ({
    order: i + 1,
    status: getStepStatus(
      i,
      currentStep,
      totalSteps,
      isStepSkipped,
      isCurrentStepComplete,
      isCurrentStepRequired,
      firstIncompleteRequiredStep
    ),
    stepName: steps[i]?.step_name || '',
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: `linear-gradient(to bottom, #EEEEEE 0%, #EEEEEE 50%, transparent 50%, transparent 100%)`,
        pr: "54px",
        py: "26px",
        pl: "272px",
      }}
    >
      {processSteps.map((step) => (
        <Box key={step.order} sx={{ mx: 1 }}>
          <ProcessStep
            order={step.order}
            status={step.status}
            stepName={step.stepName}
            onClick={() => onStepClick(step.order - 1)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ProcessFlow;
