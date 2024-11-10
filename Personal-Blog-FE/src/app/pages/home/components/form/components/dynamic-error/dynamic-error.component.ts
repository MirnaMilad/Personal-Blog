import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-error',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-error.component.html',
  styleUrl: './dynamic-error.component.scss',
})
export class DynamicErrorComponent implements OnInit {
  @Input() formName!: FormGroup;
  @Input({ required: true }) fieldName!: string;
  @Input() fieldLabel!: string | undefined;
  constructor(private formgroupDirective: FormGroupDirective) {}
  ngOnInit(): void {
    this.formName = this.formgroupDirective.control;
  }
}
