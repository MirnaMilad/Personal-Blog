import { FormControl, FormGroup } from '@angular/forms';
import { FieldRule } from './field-rules.model';
import { ButtonALignment, Category } from './form-status.model';

export interface DynamicField {
  label?: string;
  col?: number;
  value: string | number | null;
  type: string;
  text?: string;
  placeHolder?: string;
  options?: Option[] | null;
  rules?: FieldRule[];
  category?: Category;
  title?: string;
  subTitle?: string;
  cardSubTitle?: string;
  borderRadius?: boolean;
  class?: string;
  labelClass?: string;
  inlineLabel?: boolean;
}

export interface Option {
  name?: string;
  value: string | number;
  id?: string;
}

export interface Field extends DynamicField {
  fieldName: string;
}

export type Model = Record<string, DynamicField>;
export type FormGroupFields = Record<string, FormControl>;
export interface FormControlsFields {
  formGroupFields: FormGroupFields;
  fields: Field[];
}
export interface FormControlsbuild {
  formgroup: FormGroup;
  fields: Field[];
}

export type FormValue = Record<string, string>;

export interface ButtonConfig {
  buttonAlignment?: ButtonALignment;
  buttonWidth?: string;
  buttonHeight?: string;
  isLoading?: boolean;
}
