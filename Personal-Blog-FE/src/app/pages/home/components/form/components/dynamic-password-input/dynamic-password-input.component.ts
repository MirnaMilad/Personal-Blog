import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Field } from '../../models/dynamic-field.model';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-password-input',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './dynamic-password-input.component.html',
  styleUrl: './dynamic-password-input.component.scss',
})
export class DynamicPasswordInputComponent {
  hidePassword: boolean = true;
  @Input() formName!: FormGroup;
  @Input() field!: Field;
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
