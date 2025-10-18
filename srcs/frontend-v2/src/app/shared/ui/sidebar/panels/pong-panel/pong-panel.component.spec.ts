import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { I18nState } from '../../../../../state/i18n/i18n.state';
import { PongPanelComponent } from './pong-panel.component';

describe('PongPanelComponent', () => {
  let component: PongPanelComponent;
  let fixture: ComponentFixture<PongPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PongPanelComponent,
        HttpClientTestingModule,
        NgxsModule.forRoot([I18nState]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PongPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
