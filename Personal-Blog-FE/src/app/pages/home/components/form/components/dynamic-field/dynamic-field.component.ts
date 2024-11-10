import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Field, FormValue, Option } from '../../models/dynamic-field.model';
import { DynamicInputComponent } from '../dynamic-input/dynamic-input.component';
import { CommonModule } from '@angular/common';
import { DynamicPasswordInputComponent } from '../dynamic-password-input/dynamic-password-input.component';
import { DynamicSearchSelectboxComponent } from '../dynamic-search-selectbox/dynamic-search-selectbox.component';
import { DynamicTextAreaComponent } from '../dynamic-text-area/dynamic-text-area.component';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [
    DynamicInputComponent,
    CommonModule,
    ReactiveFormsModule,
    DynamicPasswordInputComponent,
    DynamicSearchSelectboxComponent,
    DynamicTextAreaComponent,
  ],
  templateUrl: './dynamic-field.component.html',
  styleUrl: './dynamic-field.component.scss',
})
export class DynamicFieldComponent {
  @Input() formName!: FormGroup;
  @Input() field!: Field;
  @Input() formValue!: FormValue;
  @Output() OptionEmmitter: EventEmitter<Option> = new EventEmitter<Option>();

  getOptionData(data: Option): void {
    this.OptionEmmitter.emit(data);
  }
}
