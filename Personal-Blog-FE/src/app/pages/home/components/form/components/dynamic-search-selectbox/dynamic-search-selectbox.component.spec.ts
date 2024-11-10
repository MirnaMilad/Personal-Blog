import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSearchSelectboxComponent } from './dynamic-search-selectbox.component';

describe('DynamicSearchSelectboxComponent', () => {
  let component: DynamicSearchSelectboxComponent;
  let fixture: ComponentFixture<DynamicSearchSelectboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSearchSelectboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicSearchSelectboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
