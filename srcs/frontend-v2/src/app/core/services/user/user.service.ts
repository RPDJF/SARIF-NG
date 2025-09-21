import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  public constructor() {}

  fetchMe() {
    return this.httpClient.get(`${environment.CORE_ENDPOINT}/users/me`);
  }
}
