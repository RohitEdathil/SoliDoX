import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotifService {
  emitter = new EventEmitter<Notif>();
  constructor() {}

  show(message: string, type: NotifType = NotifType.SUCCESS) {
    this.emitter.emit({ message, type });
  }
}

export interface Notif {
  message: string;
  type: NotifType;
}

export enum NotifType {
  SUCCESS = 'success',
  ERROR = 'error',
}
