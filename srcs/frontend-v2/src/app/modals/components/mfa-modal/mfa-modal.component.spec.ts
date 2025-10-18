import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { I18nState } from '../../../state/i18n/i18n.state';
import { MfaModalComponent } from './mfa-modal.component';

describe('MfaModalComponent', () => {
  let component: MfaModalComponent;
  let fixture: ComponentFixture<MfaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([I18nState]),
        MfaModalComponent,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MfaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
