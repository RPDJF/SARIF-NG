import { provideHttpClient } from '@angular/common/http';
import { Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import english from '../../../../assets/i18n/english.json';
import french from '../../../../assets/i18n/french.json';
import portuguese from '../../../../assets/i18n/portuguese.json';
import russian from '../../../../assets/i18n/russian.json';
import { I18nState, I18nStateModel } from './i18n.state';

const extractKeys = (obj: any) => {
  const keys = new Set<string>();
  for (const key of Object.entries(obj)) {
    keys.add(key[0]);
  }
  return keys;
};

const baseKeys = extractKeys(english);

let state: Signal<I18nStateModel>;

describe('I18n store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideStore([I18nState]), provideHttpClient()],
    });

    store = TestBed.inject(Store);
    state = store.selectSignal(I18nState.getState);
  });

  it('english should match english.json', () => {
    const expected: I18nStateModel = {
      lang: 'english',
      i18n: english,
    };
    const actual = store.selectSnapshot(I18nState.getState);
    expect(actual).toEqual(expected);
  });

  it('no missing french translations', () => {
    expect(extractKeys(french)).toEqual(baseKeys);
  });

  it('no missing portuguese translations', () => {
    expect(extractKeys(portuguese)).toEqual(baseKeys);
  });

  it('no missing russian translations', () => {
    expect(extractKeys(russian)).toEqual(baseKeys);
  });

  it('should no contain french translations by default', () => {
    expect(state().lang).toEqual('english');
    expect(state().i18n).toEqual(english);
  });

  /*it('should update translations', (done) => {
    store.dispatch(new I18nUpdateLang('french')).subscribe(() => {
      expect(state().lang).toEqual('french');
      expect(state().i18n).toEqual(french);
      done();
    });
  });*/
});
