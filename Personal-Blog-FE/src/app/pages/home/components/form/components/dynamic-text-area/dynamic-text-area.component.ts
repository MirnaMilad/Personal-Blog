import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Field } from '../../models/dynamic-field.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-text-area.component.html',
  styleUrl: './dynamic-text-area.component.scss',
})
export class DynamicTextAreaComponent {
  @Input() formName!: FormGroup;
  @Input() field!: Field;
}
