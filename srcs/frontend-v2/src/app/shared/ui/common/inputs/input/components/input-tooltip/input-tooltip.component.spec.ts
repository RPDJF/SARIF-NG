import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTooltipComponent } from './input-tooltip.component';

import { InputValidatorStatus } from '../../input.component.types';

describe('InputTooltipComponent', () => {
  let component: InputTooltipComponent;
  let fixture: ComponentFixture<InputTooltipComponent>;
  const validatorStatus: InputValidatorStatus = {
    isValid: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTooltipComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('type', 'text');
    fixture.componentRef.setInput('validatorResult', validatorStatus);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
