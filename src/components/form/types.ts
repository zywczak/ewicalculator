export interface HelpImage {
  id: number;
  image_url: string;
  caption?: string | null;
  description?: string | null;
  order?: number;
}

export interface StepImage {
  id: number;
  image_name: string;
  caption?: string | null;
  image_url: string;
}

export interface StepHelp {
  id: number;
  help_title: string;
  description?: string | null;
  images?: StepImage[];
}

export interface StepOption {
  id: number;
  option_value: string;
  order: number;
  json_value?: string;
  icon_name?: string;
}

export interface StepCondition {
  id: number;
  trigger_step: number;
  trigger_option: number;
  skip_steps: number[];
}

export interface Step {
  id: number;
  step_name: string;
  description?: string;
  order: number;
  json_key?: number;
  placeholder?: string | null;
  input_type?: string | null;
  required?: boolean | null;
  validation_regex?: string | null;
  options?: StepOption[];
  parent?: number | null;
  substeps?: Step[];
  conditions?: StepCondition[];
  help?: StepHelp[];
}

export interface StepsResponse {
  total_steps: number;
  steps: Step[];
}

export interface HelpImage {
  id: number;
  image_url: string;
  caption?: string | null;
  description?: string | null;
  order?: number;
}

