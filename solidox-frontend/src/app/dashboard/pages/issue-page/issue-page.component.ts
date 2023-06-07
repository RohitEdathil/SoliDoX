import { Component } from '@angular/core';
import { NotifService } from 'src/app/notif/notif.service';

@Component({
  selector: 'app-issue-page',
  templateUrl: './issue-page.component.html',
  styleUrls: ['./issue-page.component.css'],
})
export class IssuePageComponent {
  file: File | null = null;
  expiryDate: Date | null = null;

  constructor(private notifService: NotifService) {}

  async issue() {
    // Ensures a file is selected
    if (!this.file) {
      this.notifService.error('Please select a file');
      return;
    }

    this.notifService.start('Issuing document');

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 5000));

    this.notifService.end('Document issued');
  }
}
