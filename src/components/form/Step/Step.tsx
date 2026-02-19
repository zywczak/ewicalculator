import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import StepInput from "./StepInput";
import SubStep from "./SubStep";
import ColourStepInput from "../inputs/ColourStepInput";
import { FormStep, StepsData } from "../../../data/steps/types";

type JsonValue = string | number | Record<string, any>;

interface StepFormProps {
  currentStep: number;
  totalSteps: number;
  parentStep: FormStep;
  onNext: (
    values: Record<string, JsonValue>,
    triggerStepId?: number,
    selectedOptionId?: number
  ) => void;
  onPrev: () => void;
  onOptionChange: (optionId: number, stepId: number) => void;
  isMobile?: boolean;
  values: Record<number, string | number>;
  setValues: React.Dispatch<React.SetStateAction<Record<number, string | number>>>;
  errors: Record<number, boolean>;
  setErrors: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  selectedOptions?: number[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>;
  stepsData: StepsData;
  isDrawingMode?: boolean;
  onColourSelection?: (colourValue: string, optionId: number) => void;
}

const getAllStepsRecursive = (steps: FormStep[]): FormStep[] => {
  const result: FormStep[] = [];
  for (const step of steps) {
    result.push(step);
    if (step.substeps?.length) {
      result.push(...getAllStepsRecursive(step.substeps));
    }
  }
  return result;
};

const clearNestedValuesRecursive = (
  step: FormStep,
  updatedValues: Record<number, string | number>
): void => {
  if (!step.substeps) return;
  
  for (const sub of step.substeps) {
    delete updatedValues[sub.id];
    clearNestedValuesRecursive(sub, updatedValues);
  }
};

const updateJsonValuesForStep = (
  step: FormStep,
  valueMap: Record<number, string | number>,
  selectedOptions: number[],
  allSteps: FormStep[]
): Record<string, any> => {
  let result: Record<string, any> = {};
  const stepValue = valueMap[step.id];

  if (step.json_key !== undefined) {
    if (step.input_type === "radio") {
      const selectedOption = step.options?.find(o => 
        o.option_value === stepValue || o.json_value === stepValue
      );
      if (selectedOption?.json_value !== undefined) {
        result[step.json_key] = selectedOption.json_value;
      }
    } else if (
      step.input_type === "text" ||
      step.input_type === "number" ||
      step.input_type === "colour"
    ) {
      result[step.json_key] = stepValue;
    }
  }

  if (step.substeps?.length) {
    const nested = processSubstepsJson(step.substeps, valueMap, selectedOptions, allSteps);
    
    if (step.json_key) {
      result[step.json_key] = { ...(result[step.json_key]), ...nested };
    } else {
      result = { ...result, ...nested };
    }
  }
  return result;
};

const processSubstepsJson = (
  substeps: FormStep[],
  valueMap: Record<number, string | number>,
  selectedOptions: number[],
  allSteps: FormStep[]
): Record<string, any> => {
  const nested: Record<string, any> = {};
  
  for (const sub of substeps) {
    // Check if this substep should be skipped
    const isSkipped = allSteps.some(step =>
      step.conditions?.some(cond =>
        cond.skip_steps.includes(sub.id) &&
        selectedOptions.includes(cond.trigger_option)
      )
    );
    
    if (isSkipped) {
      continue; // Skip this substep
    }
    
    const subJson = updateJsonValuesForStep(sub, valueMap, selectedOptions, allSteps);
    if (sub.json_key && subJson[sub.json_key] !== undefined) {
      nested[sub.json_key] = subJson[sub.json_key];
    } else {
      Object.assign(nested, subJson);
    }
  }
  
  return nested;
};

const handleSkipStepsCleanup = (
  skipStepId: number,
  allSteps: FormStep[],
  parentStep: FormStep,
  setJsonValues: React.Dispatch<React.SetStateAction<Record<string, JsonValue>>>,
  setValues: React.Dispatch<React.SetStateAction<Record<number, string | number>>>,
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>
): void => {
  const skipStep = allSteps.find(s => s.id === skipStepId);
  if (!skipStep?.json_key) return;

  if (parentStep.json_key && allSteps.some(s => s.id === skipStepId)) {
    setJsonValues(prev => {
      const key = String(parentStep.json_key);
      const nested = { ...((prev[key] as Record<string, any>)) };
      delete nested[String(skipStep.json_key)];
      return { ...prev, [key]: nested };
    });
  } else {
    setJsonValues(prev => {
      const key = String(skipStep.json_key);
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  }

  setValues(prevValues => {
    const updatedValues = { ...prevValues };
    delete updatedValues[skipStepId];
    
    if (skipStep.substeps) {
      clearNestedValuesRecursive(skipStep, updatedValues);
    }
    
    return updatedValues;
  });

  const skipStepOptions = skipStep.options?.map(o => o.id) || [];
  setSelectedOptions(prev => prev.filter(opt => !skipStepOptions.includes(opt)));
};

const processConditionsForOption = (
  step: FormStep,
  optionId: number,
  allSteps: FormStep[],
  parentStep: FormStep,
  setJsonValues: React.Dispatch<React.SetStateAction<Record<string, JsonValue>>>,
  setValues: React.Dispatch<React.SetStateAction<Record<number, string | number>>>,
  setSelectedOptions: React.Dispatch<React.SetStateAction<number[]>>
): void => {
  if (!step?.conditions) return;

  for (const cond of step.conditions) {
    if (cond.trigger_option !== optionId) continue;

    for (const skipStepId of cond.skip_steps) {
      handleSkipStepsCleanup(
        skipStepId,
        allSteps,
        parentStep,
        setJsonValues,
        setValues,
        setSelectedOptions
      );
    }
  }
};

const checkSingleCondition = (
  cond: any,
  substepId: number,
  selectedOptions: number[]
): { shouldShow: boolean; shouldHide: boolean } => {
  const shouldHide = cond.skip_steps.includes(substepId) && 
                     selectedOptions.includes(cond.trigger_option);
  const shouldShow = cond.show_steps?.includes(substepId) && 
                     selectedOptions.includes(cond.trigger_option);
  
  return { shouldShow, shouldHide };
};

const processStepConditions = (
  step: FormStep,
  substepId: number,
  selectedOptions: number[]
): { shouldShow: boolean; shouldHide: boolean } => {
  let shouldShow = false;
  let shouldHide = false;

  if (!step.conditions) return { shouldShow, shouldHide };

  for (const cond of step.conditions) {
    const result = checkSingleCondition(cond, substepId, selectedOptions);
    shouldShow = shouldShow || result.shouldShow;
    shouldHide = shouldHide || result.shouldHide;
  }

  return { shouldShow, shouldHide };
};

const checkConditionsRecursive = (
  steps: FormStep[],
  substepId: number,
  selectedOptions: number[]
): { shouldShow: boolean; shouldHide: boolean } => {
  let shouldShow = false;
  let shouldHide = false;

  for (const step of steps) {
    const stepResult = processStepConditions(step, substepId, selectedOptions);
    shouldShow = shouldShow || stepResult.shouldShow;
    shouldHide = shouldHide || stepResult.shouldHide;
    
    if (step.substeps?.length) {
      const nested = checkConditionsRecursive(step.substeps, substepId, selectedOptions);
      shouldShow = shouldShow || nested.shouldShow;
      shouldHide = shouldHide || nested.shouldHide;
    }
  }

  return { shouldShow, shouldHide };
};

const hasShowConditionsRecursive = (steps: FormStep[], substepId: number): boolean => {
  for (const step of steps) {
    if (step.conditions?.some(cond => cond.show_steps?.includes(substepId))) {
      return true;
    }
    if (step.substeps?.length && hasShowConditionsRecursive(step.substeps, substepId)) {
      return true;
    }
  }
  return false;
};

const Step: React.FC<StepFormProps> = ({
  currentStep,
  totalSteps,
  parentStep,
  onNext,
  onPrev,
  onOptionChange,
  isMobile = false,
  values,
  setValues,
  errors,
  setErrors,
  selectedOptions = [],
  setSelectedOptions,
  stepsData,
  isDrawingMode,
  onColourSelection,
}) => {
  const isLast = currentStep === totalSteps - 1;
  const allSteps = [parentStep, ...(parentStep.substeps || [])];
  const [jsonValues, setJsonValues] = React.useState<Record<string, JsonValue>>({});

  const isStepComplete = React.useMemo(() => {
    // Block completion ONLY for step 11 (select colour) if in drawing mode
    if (isDrawingMode && parentStep.id === 11) {
      return false;
    }
    
    // For step 1 (house type), check if house type is selected
    if (parentStep.id === 1) {
      const hasHouseOption = values[1] !== undefined && values[1] !== "" && !errors[1];
      return hasHouseOption;
    }
    
    return allSteps.every(step => {
      if (!step.required) return true;
      return values[step.id] !== undefined && values[step.id] !== "" && !errors[step.id];
    });
  }, [values, errors, parentStep, isDrawingMode]);

  React.useEffect(() => {
    allSteps.forEach(step => {
      if (step.input_type === "radio") {
        const val = values[step.id];
        if (val !== undefined && val !== "") {
          const opt = step.options?.find(o => o.option_value === val);
          if (opt) {
            onOptionChange(opt.id, step.id);
          }
        }
      }
    });
  }, [parentStep.id, JSON.stringify(values)]);

  const handleChange = (stepId: number, value: string | number, optionId?: number) => {
    
    // Calculate new selectedOptions FIRST
    let newSelectedOptions = selectedOptions;
    if (optionId !== undefined) {
      const allStepsRecursive = getAllStepsRecursive([parentStep]);
      const step = allStepsRecursive.find(s => s.id === stepId);
      const stepOptions = step?.options?.map(o => o.id) || [];
      const filtered = selectedOptions.filter(opt => !stepOptions.includes(opt));
      newSelectedOptions = [...filtered, optionId];
    }

    setValues(prev => {
      const newValues = { ...prev, [stepId]: value };
      setJsonValues(prevJson => {
        const updatedJson = { ...prevJson };
        const allStepsRecursive = getAllStepsRecursive(stepsData.steps);
        // Use newSelectedOptions instead of old selectedOptions
        const stepJson = updateJsonValuesForStep(parentStep, newValues, newSelectedOptions, allStepsRecursive);
        return { ...updatedJson, ...stepJson };
      });
      return newValues;
    });

    if (optionId !== undefined) {
      const allStepsRecursive = getAllStepsRecursive([parentStep]);
      const step = allStepsRecursive.find(s => s.id === stepId);
      const stepOptions = step?.options?.map(o => o.id) || [];
      
      setSelectedOptions(prev => {
        const filtered = prev.filter(opt => !stepOptions.includes(opt));
        return [...filtered, optionId];
      });

      processConditionsForOption(
        step!,
        optionId,
        allStepsRecursive,
        parentStep,
        setJsonValues,
        setValues,
        setSelectedOptions
      );
    }

    if (optionId !== undefined) onOptionChange(optionId, stepId);
    
    // If step 11 (colour) and we have onColourSelection, trigger image generation
    if (stepId === 11 && optionId !== undefined && value && onColourSelection) {
      onColourSelection(String(value), optionId);
    }
  };

  const handleNextClick = () => {
    const allSteps = [parentStep, ...(parentStep.substeps || [])];

    for (let step of allSteps) {
      if (step.required && !values[step.id]) {
        alert(`${step.step_name} is required`);
        return;
      }
    }

    let triggerStepId: number | undefined;
    let selectedOptionId: number | undefined;

    if (parentStep.conditions) {
      parentStep.conditions.forEach(cond => {
        const option = parentStep.options?.find(o => o.id === cond.trigger_option);
        if (values[parentStep.id] === option?.option_value) {
          triggerStepId = cond.trigger_step;
          selectedOptionId = cond.trigger_option;
        }
      });
    }

    const allStepsRecursive = getAllStepsRecursive(stepsData.steps);
    const stepJson = updateJsonValuesForStep(parentStep, values, selectedOptions, allStepsRecursive);
    const finalJson = { ...jsonValues, ...stepJson };

    setJsonValues(finalJson);
    onNext(finalJson, triggerStepId, selectedOptionId);
  };

  const handlePrevClick = () => {
    const allSteps = [parentStep, ...(parentStep.substeps || [])];

    setJsonValues(prevJson => {
      const updatedJson = { ...prevJson };

      if (parentStep.json_key) {
        delete updatedJson[parentStep.json_key];
      } else {
        allSteps.forEach(step => {
          if (step.json_key) delete updatedJson[step.json_key];
        });
      }

      return updatedJson;
    });

    onPrev();
  };

  React.useEffect(() => {
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).__multiStepFormHandlers = {
        handleNextClick,
        handlePrevClick,
        isStepComplete,
      };
    }
  }, [handleNextClick, handlePrevClick, isStepComplete]);

  // Clear any focused substep image when switching parent steps
  React.useEffect(() => {
    if ((globalThis as any).__setFocusedSubstepImage) {
      (globalThis as any).__setFocusedSubstepImage(null);
    }
  }, [parentStep.id]);

  const isSubstepVisible = React.useCallback((substepId: number): boolean => {
    const { shouldShow, shouldHide } = checkConditionsRecursive(
      stepsData.steps,
      substepId,
      selectedOptions
    );

    if (shouldHide) return false;

    const hasShowConds = hasShowConditionsRecursive(stepsData.steps, substepId);
    if (hasShowConds) return shouldShow;

    return true;
  }, [stepsData, selectedOptions]);

  const getVisibleSubsteps = React.useCallback((substeps: FormStep[]): FormStep[] => {
    if (!substeps?.length) return [];
    
    return substeps
      .filter(substep => isSubstepVisible(substep.id))
      .map(substep => {
        if (substep.substeps?.length) {
          return {
            ...substep,
            substeps: getVisibleSubsteps(substep.substeps)
          };
        }
        return substep;
      });
  }, [isSubstepVisible]);

  const visibleSubsteps = React.useMemo(() => {
    return getVisibleSubsteps(parentStep.substeps || []);
  }, [parentStep.substeps, getVisibleSubsteps]);

  return (
    <Box
      sx={{
        pt: "30px",
        pb: isMobile ? "24px" : "0px",
        width: isMobile ? "100%" : "292px",
        boxSizing: "border-box",
      }}
    >
      {isMobile && (
        <>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "38px",
              pl: "24px",
              mb: "10px",
            }}
            dangerouslySetInnerHTML={{ __html: parentStep.step_name || "" }}
          />
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              color: "#424242",
              mt: "24px",
              px: "24px",
            }}
            dangerouslySetInnerHTML={{ __html: parentStep.description || "" }}
          />
          <Divider sx={{ mb: "24px", ml: "24px", mr: "20px", color: "#D0DBE0" }} />
        </>
      )}
      {parentStep.id === 11 ? (
        <ColourStepInput
          step={parentStep}
          value={values[parentStep.id] || ""}
          onChange={(val, optionId) => handleChange(parentStep.id, val, optionId)}
          isMobile={isMobile}
          selectedParentOptionIds={selectedOptions}
          disabled={!!isDrawingMode}
        />
      ) : (
        <StepInput
          step={parentStep}
          value={values[parentStep.id] || ""}
          onChange={(val, optionId) => handleChange(parentStep.id, val, optionId)}
          onErrorChange={(hasError) =>
            setErrors(prev => ({ ...prev, [parentStep.id]: hasError }))
          }
          isMobile={isMobile}
          selectedParentOptionIds={selectedOptions}
        />
      )}

      {visibleSubsteps.map((sub) => {
        const value = values[sub.id] || "";

        if (isLast && (sub.input_type === "text" || sub.input_type === "number")) {
          return (
            <StepInput
              key={sub.id}
              step={sub}
              label={sub.step_name || undefined}
              value={value}
              onChange={(val) => handleChange(sub.id, val)}
              onErrorChange={(hasError) =>
                setErrors(prev => ({ ...prev, [sub.id]: hasError }))
              }
              isMobile={isMobile}
            />
          );
        }

        return (
          <SubStep
            key={sub.id}
            step={sub}
            value={values[sub.id] || ""}
            onChange={handleChange}
            valuesMap={values}
            isMobile={isMobile}
            selectedParentOptionIds={selectedOptions}
            stepsData={stepsData}
          />
        );
      })}
    </Box>
  );
};

export default Step;