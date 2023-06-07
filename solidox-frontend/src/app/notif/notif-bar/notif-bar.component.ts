import { Component } from '@angular/core';
import { Notif, NotifService, NotifType } from '../notif.service';

@Component({
  selector: 'app-notif-bar',
  templateUrl: './notif-bar.component.html',
  styleUrls: ['./notif-bar.component.css'],
})
export class NotifBarComponent {
  notif?: Notif;
  hidden = true;
  notifService: NotifService;
  timer?: NodeJS.Timeout;

  constructor(notifService: NotifService) {
    this.notifService = notifService;
  }

  ngOnInit() {
    this.notifService.emitter.subscribe((notif) => {
      this.show(notif);
    });
  }

  isError() {
    return this.notif?.type === NotifType.ERROR;
  }

  isProcess() {
    return this.notif?.type === NotifType.PROCESS_START;
  }

  show(notif: Notif) {
    this.notif = notif;
    this.hidden = false;

    // Reset the timer
    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (notif.type === NotifType.PROCESS_START) return;

    this.timer = setTimeout(() => {
      this.hidden = true;
    }, 3000);
  }

  hide() {
    this.hidden = true;
  }
}
