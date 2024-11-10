import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Field, FormValue, Option } from '../../models/dynamic-field.model';

@Component({
  selector: 'app-dynamic-search-selectbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-search-selectbox.component.html',
  styleUrl: './dynamic-search-selectbox.component.scss',
})
export class DynamicSearchSelectboxComponent implements OnInit, OnChanges {
  @Input() formName!: FormGroup;
  @Input() field!: Field;
  @Input() formValue!: FormValue;
  @Output() OptionEmmitter: EventEmitter<Option> = new EventEmitter<Option>();
  items: Option[] | null | undefined;
  filteredItems: Option[] | null | undefined;
  isDropdownVisible: boolean = false;
  selectedItem!: string | number;
  ngOnInit(): void {
    this.items = this.field.options;
    this.filteredItems = this.items;
    this.selectedItem = this.selectedItemControl.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['field']) {
      this.items = changes['field'].currentValue.options;
    }
  }
  get selectedItemControl(): FormControl {
    return this.formName.get(this.field.fieldName) as FormControl;
  }
  onSearch(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const query: string = input.value;
    // Filter fonts based on the query
    this.filteredItems = this.items?.filter((item: Option) => {
      if (typeof item.value == 'string') {
        return item.value?.toLowerCase().includes(query.toLowerCase());
      }
      return false;
    });
  }
  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
    if (this.isDropdownVisible) {
      this.filteredItems = this.items;
    }
  }
  selectItem(item: Option): void {
    this.selectedItem = item.value;
    this.selectedItemControl.setValue(this.selectedItem);
    this.isDropdownVisible = false;
    if (this.field.fieldName === 'selectedTheme') {
      this.formName.get('name')?.setValue(this.selectedItem);
      this.OptionEmmitter.emit(item);
    }
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target: HTMLElement = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.isDropdownVisible = false;
    }
  }
}
