import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PongPanelComponent } from './pong-panel.component';

describe('PongPanelComponent', () => {
  let component: PongPanelComponent;
  let fixture: ComponentFixture<PongPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PongPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PongPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
