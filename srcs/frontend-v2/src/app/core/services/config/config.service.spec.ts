import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import { provideStore } from '@ngxs/store';
import { I18nState } from '../../../state/i18n/i18n.state';
import { provideHttpClient } from '@angular/common/http';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have config', () => {
    expect(service.config).toBeDefined();
  });
});
