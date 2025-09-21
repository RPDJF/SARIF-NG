import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { provideStore } from '@ngxs/store';
import { I18nState } from '../../../state/i18n/i18n.state';
import { provideHttpClient } from '@angular/common/http';
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
