import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import { provideStore } from '@ngxs/store';
import { I18nState } from '../../../state/i18n/i18n.state';
import { provideHttpClient } from '@angular/common/http';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent],
      providers: [provideStore([I18nState]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
