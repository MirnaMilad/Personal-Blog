import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from '../form/components/dynamic-form/dynamic-form.component';
import { Model } from '../form/models/dynamic-field.model';
import { ModelService } from '../../services/model.service';
import { ButtonName } from '../form/models/form-status.model';
import { Blog } from '../../models/personalBlog.model';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent {
  @ViewChild('closeButton') closeButton!: ElementRef;
  @ViewChild('dynamicForm') dynamicForm!: DynamicFormComponent;
  formModel!: Model;
  buttonName: ButtonName = ButtonName.PUBLISH;
  @Input() modalId!: string;
  @Input() header!: string;

  @Output() formValuesEmitter: EventEmitter<Record<string, string | number>> =
    new EventEmitter<Record<string, string | number>>();

  constructor(private modelService: ModelService) {
    this.formModel = this.modelService.model;
  }

  emitFormValue(value: Record<string, string | number>) {
    this.formValuesEmitter.emit(value);
    this.closeButton.nativeElement.click();
  }

  patchValues(blog: Blog | null) {
    this.dynamicForm.dynamicFormGroup.reset();
    if (blog) {
      this.dynamicForm.dynamicFormGroup.patchValue(blog);
    }
  }
}
