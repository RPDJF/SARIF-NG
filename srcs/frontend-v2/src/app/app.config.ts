import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { I18nState } from './state/i18n/i18n.state';
import { provideStore } from '@ngxs/store';
import { I18nService } from './core/services/i18n/i18n.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore([I18nState]),
    {
      provide: APP_INITIALIZER,
      useFactory: (i18nService: I18nService) => {
        return () => i18nService.init();
      },
      deps: [I18nService],
      multi: true,
    },
  ],
};
