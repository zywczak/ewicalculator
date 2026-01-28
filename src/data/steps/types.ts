import { ReactNode } from 'react';
import { SimpleTable } from '../helpTables/types';

export type InputType = 'radio'  | 'number' | 'text'  | 'colour'  | null;

export type HeaderType = 'column' | 'row';

export type DataType = 'text' | 'number' | 'boolean' | 'scale' | null;

export interface FormStepOption {
  id: number;
  option_value: string;
  json_value: string | null;
  image: string | null;
  parent_option_id?: number[];
  option_image?: string | null;
}

export interface HelpImage {
  image_name: string;
  caption: string | null;
  image_url: string;
  description: string | null;
}

export type DescriptionType = string | ReactNode | null;

export interface HelpSection {
  help_title: string;
  upper_description: DescriptionType;
  downer_description: DescriptionType;
  images?: HelpImage[];
  table?: SimpleTable;
  side_description?: string;
  disclaimer?: string;
  useColourSamples?: boolean;
  useOptionColours?: boolean;
}

export interface StepCondition {
  trigger_step: number;
  trigger_option: number;
  skip_steps: number[];
  show_steps?: number[];
}

export interface FormStep {
  id: number; //is also used as step order
  step_name: string | null;
  description: string | ReactNode | null;
  json_key: string;
  input_type: InputType;
  placeholder: string | null;
  required: boolean | null;
  parent: number | null;
  validation_regex: string | null;
  substeps: FormStep[];
  options: FormStepOption[];
  help: HelpSection[];
  conditions: StepCondition[];
  image?: string | null; // Obrazek reprezentujący krok
  generateImageWithAI?: boolean; // Czy ten krok powinien generować zdjęcia przez AI
  aiImagePrompt?: string; // Szablon promptu dla AI
}

export interface StepsData {
  total_steps: number;
  steps: FormStep[];
}