import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  readonly config = environment;
  constructor() {}
}
