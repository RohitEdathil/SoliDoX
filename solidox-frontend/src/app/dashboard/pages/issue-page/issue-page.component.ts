import { Component } from '@angular/core';
import { DocService } from 'src/app/doc/doc.service';
import { NotifService } from 'src/app/notif/notif.service';

@Component({
  selector: 'app-issue-page',
  templateUrl: './issue-page.component.html',
  styleUrls: ['./issue-page.component.css'],
})
export class IssuePageComponent {
  file: File | null = null;
  expiryDate: string | null = null;

  result: string | null = null;

  constructor(
    private notifService: NotifService,
    private docService: DocService
  ) {}

  fileChanged(event: any) {
    this.file = event.target.files[0];
  }

  async issue() {
    // Ensures a file is selected
    if (!this.file) {
      this.notifService.error('Please select a file');
      return;
    }
    this.result = null;
    const docId = await this.docService.issue(
      this.file,
      this.expiryDate ? new Date(this.expiryDate) : null
    );
    this.result = this.docService.getDownloadSdxUrl(docId);
  }
}
