import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { I18nState } from '../../../state/i18n/i18n.state';
import { TranslationKey } from '../../../state/i18n/i18n.state.types';
import { I18nPipe, I18nSnapshotPipe } from './i18n.pipe';

describe('I18nPipe', () => {
  let pipe: I18nPipe;
  let pipeSnapshot: I18nSnapshotPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([I18nState]), HttpClientTestingModule],
      providers: [I18nPipe, I18nSnapshotPipe],
    });

    pipe = TestBed.inject(I18nPipe);
    pipeSnapshot = TestBed.inject(I18nSnapshotPipe);
  });
  it('create an translate instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('create an translateSnapshot instance', () => {
    expect(pipeSnapshot).toBeTruthy();
  });

  it('translate should translate a key', () => {
    expect(pipe.transform('hello' as TranslationKey)()).toBe('❌ !hello');
  });

  it('translateSnapshot should translate a key', () => {
    expect(pipeSnapshot.transform('hello' as TranslationKey)).toBe('❌ !hello');
  });
});
