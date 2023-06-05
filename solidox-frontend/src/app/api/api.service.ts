import { Injectable } from '@angular/core';
import { NotifService, NotifType } from '../notif/notif.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000';
  token?: string = undefined;
  constructor(private notifService: NotifService) {}

  private async _fetch(path: string, method: string, body: Object = {}) {
    const result = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await result.json();
    if (result.status >= 400) {
      this.notifService.show(data.message, NotifType.ERROR);
      throw new Error(data.message);
    }
    return data;
  }

  async post(path: string, body: Object) {
    return await this._fetch(path, 'POST', body);
  }

  setToken(token: string) {
    this.token = token;
  }
}
