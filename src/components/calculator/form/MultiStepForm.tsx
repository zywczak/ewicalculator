import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import StepInput from "./step/StepInput";
import SubStep from "./step/SubStep";

import { FormStep } from "../../../data/steps/stepsData";

interface MultiStepFormProps {
  currentStep: number;
  totalSteps: number;
  parentStep: FormStep;
  skipStepIds: number[];
  onNext: (
    values: Record<string, string | number | Record<string, any>>,
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
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  currentStep,
  totalSteps,
  parentStep,
  skipStepIds,
  onNext,
  onPrev,
  onOptionChange,
  isMobile = false,
  values,
  setValues,
  errors,
  setErrors,
}) => {
  const isLast = currentStep === totalSteps - 1;

  const [jsonValues, setJsonValues] = React.useState<
    Record<string, string | number | Record<string, any>>
  >({});

  const isStepComplete = React.useMemo(() => {
    const allSteps = [parentStep, ...(parentStep.substeps || [])];
    return allSteps.every(step => {
      if (!step.required) return true;
      return values[step.id] !== undefined && values[step.id] !== "" && !errors[step.id];
    });
  }, [values, errors, parentStep]);

  // Jeśli przy wejsciu do kroku istnieją już ustawione wartości (np. po cofnięciu
  // lub przywróceniu stanu), przekaż odpowiadające im `optionId` do nadrzędnego
  // komponentu, żeby `selectedOptions` zostało zsynchronizowane natychmiast.
  React.useEffect(() => {
    const allSteps = [parentStep, ...(parentStep.substeps || [])];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentStep.id, JSON.stringify(values)]);

  const handleChange = (stepId: number, value: string | number, optionId?: number) => {
    setValues(prev => {
      const newValues = { ...prev, [stepId]: value };

      setJsonValues(prevJson => {
        const updatedJson = { ...prevJson };

        const stepJson = updateJsonValues(parentStep, newValues);
        return { ...updatedJson, ...stepJson };
      });

      return newValues;
    });

    if (optionId !== undefined) {
      const allSteps = [parentStep, ...(parentStep.substeps || [])];
      const step = allSteps.find(s => s.id === stepId);

      step?.conditions?.forEach(cond => {
        if (cond.trigger_option === optionId) {
          cond.skip_steps.forEach(skipStepId => {
            const skipStep = allSteps.find(s => s.id === skipStepId);
            if (!skipStep?.json_key) return;

            if (parentStep.json_key && parentStep.substeps?.some(s => s.id === skipStepId)) {
              setJsonValues(prev => {
                const key = String(parentStep.json_key);
                const nested = { ...((prev[key] as Record<string, any>) || {}) };
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
              return updatedValues;
            });
          });
        }
      });
    }

    if (optionId !== undefined) onOptionChange(optionId, stepId);
  };

  const updateJsonValues = (
    step: FormStep,
    valueMap: Record<number, string | number>
  ): Record<string, any> => {
    let result: Record<string, any> = {};

    const stepValue = valueMap[step.id];

    if (step.json_key !== undefined) {
      if (step.input_type === "radio") {
        const selectedOption = step.options?.find(
          o => o.option_value === stepValue
        );
        if (selectedOption?.json_value !== undefined) {
          result[step.json_key] = selectedOption.json_value;
        }
      }
      else if (
        step.input_type === "text" ||
        step.input_type === "number" ||
        step.input_type === "colour"
      ) {
        result[step.json_key] = stepValue;
      }
    }


    if (step.substeps?.length) {
      const nested: Record<string, any> = {};
      for (const sub of step.substeps) {
        const subJson = updateJsonValues(sub, valueMap);
        if (sub.json_key && subJson[sub.json_key] !== undefined) {
          nested[sub.json_key] = subJson[sub.json_key];
        } else {
          Object.assign(nested, subJson);
        }
      }

      if (step.json_key) {
        result[step.json_key] = { ...(result[step.json_key] || {}), ...nested };
      } else {
        result = { ...result, ...nested };
      }
    }

    return result;
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
        if (option && values[parentStep.id] === option.option_value) {
          triggerStepId = cond.trigger_step;
          selectedOptionId = cond.trigger_option;
        }
      });
    }

    const stepJson = updateJsonValues(parentStep, values);

    const finalJson = { ...jsonValues, ...stepJson };

    console.log("📦 JSON wysyłany do onNext:", finalJson);

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

      console.log("JSON po cofaniu:", updatedJson);
      return updatedJson;
    });

    onPrev();
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__multiStepFormHandlers = {
        handleNextClick,
        handlePrevClick,
        isStepComplete,
      };
    }
  }, [handleNextClick, handlePrevClick, isStepComplete]);

  return (
    <Box
      sx={{
        pt: "30px",
        pb: isMobile ? "24px" : "0px",
        width: isMobile ? "100%" : "281px",
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
      <StepInput
        step={parentStep}
        value={values[parentStep.id] || ""}
        onChange={(val, optionId) => handleChange(parentStep.id, val, optionId)}
        onErrorChange={(hasError) =>
          setErrors(prev => ({ ...prev, [parentStep.id]: hasError }))
        }
        isMobile={isMobile}
      />

      {(parentStep.substeps || [])
        .map((sub) => {
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
            />
          );
        })}
    </Box>
  );
};

export default MultiStepForm;