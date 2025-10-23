import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTooltipComponent } from './input-tooltip.component';

describe('InputTooltipComponent', () => {
  let component: InputTooltipComponent;
  let fixture: ComponentFixture<InputTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTooltipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
