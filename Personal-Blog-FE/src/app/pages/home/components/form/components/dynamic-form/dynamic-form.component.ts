import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {
  ButtonConfig,
  Field,
  FormControlsbuild,
  Model,
} from '../../models/dynamic-field.model';
import { FormBuilderService } from '../../service/form-builder.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';
import { CommonModule } from '@angular/common';
import { DynamicErrorComponent } from '../dynamic-error/dynamic-error.component';
import {
  ButtonALignment,
  ButtonName,
  FormStatus,
} from '../../models/form-status.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    DynamicFieldComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    DynamicErrorComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  dynamicFormGroup!: FormGroup;
  fields!: Field[];
  isEditable: boolean = false;
  //Inputs
  @Input({ required: true }) model!: Model;
  @Input() buttonName: ButtonName = ButtonName.PUBLISH;
  @Input() formStatus: FormStatus = FormStatus.CREATE;
  @Input() buttonConfig: ButtonConfig = {
    buttonAlignment: ButtonALignment.CENTER,
    buttonWidth: 'auto',
    buttonHeight: 'auto',
  };
  //Outputs
  @Output() formValuesEmitter: EventEmitter<Record<string, string | number>> =
    new EventEmitter<Record<string, string | number>>(); // Event Emitter to send Data

  constructor(private formBuilderService: FormBuilderService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    const form: FormControlsbuild = this.formBuilderService.buildForm(
      this.model
    );
    this.fields = form.fields;
    this.dynamicFormGroup = form.formgroup;
  }

  onSubmitForm(): void {
    if (this.dynamicFormGroup.valid) {
      this.formValuesEmitter.emit(this.dynamicFormGroup.value);
    } else {
      this.dynamicFormGroup.markAllAsTouched();
    }
  }
}
