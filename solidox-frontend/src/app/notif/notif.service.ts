import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotifService {
  emitter = new EventEmitter<Notif>();
  constructor() {}

  show(message: string) {
    this.emitter.emit({ message, type: NotifType.SUCCESS });
  }
  error(message: string) {
    this.emitter.emit({ message, type: NotifType.ERROR });
  }
  start(message: string) {
    this.emitter.emit({ message, type: NotifType.PROCESS_START });
  }
  end(message: string) {
    this.emitter.emit({ message, type: NotifType.PROCESS_END });
  }
}

export interface Notif {
  message: string;
  type: NotifType;
}

export enum NotifType {
  SUCCESS = 'success',
  ERROR = 'error',
  PROCESS_START = 'process-started',
  PROCESS_END = 'process-ended',
}
