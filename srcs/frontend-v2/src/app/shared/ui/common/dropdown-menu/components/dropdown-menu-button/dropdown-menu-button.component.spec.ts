import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuButtonComponent } from './dropdown-menu-button.component';

describe('DropdownMenuButtonComponent', () => {
  let component: DropdownMenuButtonComponent;
  let fixture: ComponentFixture<DropdownMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
