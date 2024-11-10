import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPasswordInputComponent } from './dynamic-password-input.component';

describe('DynamicPasswordInputComponent', () => {
  let component: DynamicPasswordInputComponent;
  let fixture: ComponentFixture<DynamicPasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicPasswordInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicPasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
