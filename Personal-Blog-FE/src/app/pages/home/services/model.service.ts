import { Injectable } from '@angular/core';
import { Model } from '../components/form/models/dynamic-field.model';
import { FieldRule } from '../components/form/models/field-rules.model';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  constructor() {}

  model: Model = {
    name: {
      value: '',
      type: 'text',
      placeHolder: 'Article Title',
      rules: [FieldRule.required],
      class: '',
    },
    date: {
      value: '',
      type: 'date',
      placeHolder: 'Publishing Date',
      rules: [FieldRule.required],
      class: '',
    },
    description: {
      value: '',
      type: 'text-area',
      placeHolder: 'Content',
      rules: [FieldRule.required],
      class: '',
    },
  };
}
