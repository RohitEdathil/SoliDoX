import { Injectable } from '@angular/core';
import { NotifService } from '../notif/notif.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000';
  token?: string = undefined;
  constructor(private notifService: NotifService) {}

  private async _fetch(
    path: string,
    method: string,
    body: Object = {},
    formData?: FormData
  ) {
    let result;

    if (formData) {
      result = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        body: formData,
      });
    } else {
      result = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
        body: method == 'GET' ? null : JSON.stringify(body),
      });
    }

    const data = await result.json();

    if (result.status >= 400) {
      this.notifService.error(data.message);
      throw new Error(data.message);
    }
    return data;
  }

  async post(path: string, body: Object) {
    return await this._fetch(path, 'POST', body);
  }

  async get(path: string) {
    return await this._fetch(path, 'GET');
  }

  async postFormData(path: string, body: FormData) {
    return await this._fetch(path, 'POST', {}, body);
  }

  setToken(token: string) {
    this.token = token;
  }
}
