import { inject, Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../../services/i18n/i18n.service';
import { TranslationKey } from '../../../state/i18n/i18n.state.types';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class I18nPipe implements PipeTransform {
  i18nService = inject(I18nService);

  transform(value: TranslationKey) {
    return this.i18nService.translate(value as TranslationKey);
  }
}

@Pipe({
  name: 'translateSnapshot',
  standalone: true,
})
export class I18nSnapshotPipe implements PipeTransform {
  i18nService = inject(I18nService);

  transform(value: TranslationKey) {
    return this.i18nService.translateSnapshot(value as TranslationKey);
  }
}
