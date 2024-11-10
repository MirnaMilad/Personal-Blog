import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Field } from '../../models/dynamic-field.model';
@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './dynamic-input.component.html',
  styleUrl: './dynamic-input.component.scss',
})
export class DynamicInputComponent {
  @Input() formName!: FormGroup;
  @Input() field!: Field;
}
