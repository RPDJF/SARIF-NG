import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngxs/store';
import { I18nState } from '../../../core/state/i18n/i18n.state';
import { SidebarComponent } from './sidebar.component';
import { SidebarConfig } from './sidebar.component.types';

describe('SidebarComponent', () => {
  const sidebarConf: SidebarConfig = [
    {
      iconAsset: '',
      name: 'navbar.friend.label',
      routerLink: 'friends',
    },
  ];
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideStore([I18nState]), provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    fixture.componentRef.setInput('config', sidebarConf);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
