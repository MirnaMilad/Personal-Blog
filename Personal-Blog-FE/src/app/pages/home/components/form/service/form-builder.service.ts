import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  DynamicField,
  Field,
  FormControlsbuild,
  FormControlsFields,
  FormGroupFields,
  Model,
} from '../models/dynamic-field.model';
import { FieldRule } from '../models/field-rules.model';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  // Creating the form Builer
  buildForm(model: Model): FormControlsbuild {
    const formGroupFields: FormControlsFields =
      this.getFormControlsFields(model);
    const formgroup: FormGroup = new FormGroup(formGroupFields.formGroupFields);
    const fields: Field[] = formGroupFields.fields;
    return { formgroup, fields };
  }

  getFormControlsFields(model: Model): FormControlsFields {
    const formGroupFields: FormGroupFields = {};
    const fields: Field[] = [];

    for (const field of Object.keys(model)) {
      const fieldProps: DynamicField = model[field];
      const validators: ValidatorFn[] = this.addValidator(fieldProps.rules); // To Add validators to each field
      this.createFormControl(
        fieldProps,
        field,
        formGroupFields,
        validators,
        fields
      );
    }
    return { formGroupFields, fields };
  }

  createFormControl(
    fieldProps: DynamicField,
    field: string,
    formGroupFields: FormGroupFields,
    validators: ValidatorFn[],
    fields: Field[]
  ): void {
    fields.push({ ...fieldProps, fieldName: field }); // To Add field Name (key in model) in the fields]
    formGroupFields[field] = new FormControl(fieldProps.value, validators); // To Create (new FormControl) to each key of the Object and put it in formGroupFields
  }

  private addValidator(rules?: FieldRule[]): ValidatorFn[] {
    // if it has no validators, return an empty array
    if (!rules || rules.length === 0) {
      return [];
    }
    // if it has rules, map each rule to the corresponding validator
    const validators: ValidatorFn[] = rules
      .map((rule: FieldRule) => {
        switch (rule) {
          case FieldRule.required:
            return Validators.required;
          case FieldRule.password:
            return Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            );
          case FieldRule.email:
            return Validators.email;
          default:
            return null;
        }
      })
      .filter(
        (validator: ValidatorFn | null): validator is ValidatorFn => !!validator
      );

    return validators;
  }
}
