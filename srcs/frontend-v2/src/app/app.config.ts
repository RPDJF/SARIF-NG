import { APP_INITIALIZER, ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { provideStore } from '@ngxs/store';
import { firstValueFrom, zip } from 'rxjs';
import { environment } from '../../environments/environment';
import { routes } from './app.routes';
import { HydratableService } from './core/services/hydratableService/hydratableService';
import { I18nService } from './core/services/i18nService/i18n.service';
import { UserService } from './core/services/userService/user.service';
import { AuthentificationState } from './core/state/authentification/authentification.state';
import { I18nState } from './core/state/i18n/i18n.state';
import { UserState } from './core/state/user/user.state';

function hydrateFactory() {
  const hydrationServices: Array<HydratableService> = [
    inject(UserService),
    inject(I18nService),
  ];

  return () =>
    firstValueFrom(
      zip(hydrationServices.map((service) => service.hydrateService())),
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    environment.ENVIRONMENT === 'production'
      ? provideStore([I18nState, UserState, AuthentificationState])
      : provideStore(
          [I18nState, UserState, AuthentificationState],
          withNgxsReduxDevtoolsPlugin(),
        ),
    {
      provide: APP_INITIALIZER,
      useFactory: hydrateFactory,
      multi: true,
    },
  ],
};
