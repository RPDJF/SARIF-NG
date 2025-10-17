import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfaModalComponent } from './mfa-modal.component';

describe('MfaModalComponent', () => {
  let component: MfaModalComponent;
  let fixture: ComponentFixture<MfaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MfaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
