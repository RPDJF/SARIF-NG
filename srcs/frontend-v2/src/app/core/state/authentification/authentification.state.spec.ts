import { provideHttpClient } from '@angular/common/http';
import { Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import {
  AuthentificationState,
  AuthentificationStateModel,
} from './authentification.state';

describe('Authentification store', () => {
  let store: Store;
  let state: Signal<AuthentificationStateModel>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([AuthentificationState]), provideHttpClient()],
    });

    store = TestBed.inject(Store);
    state = store.selectSignal(AuthentificationState.getState);
  });

  it('should not crash', () => {
    expect(state).toBeDefined();
  });
});
