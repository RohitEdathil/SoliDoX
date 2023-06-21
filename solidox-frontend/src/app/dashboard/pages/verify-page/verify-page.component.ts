import { Component } from '@angular/core';
import { Doc } from 'src/app/doc/doc.model';
import { DocService } from 'src/app/doc/doc.service';
import { NotifService } from 'src/app/notif/notif.service';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.component.html',
  styleUrls: ['./verify-page.component.css'],
})
export class VerifyPageComponent {
  file: File | null = null;

  result?: { doc: Doc; validity: string; orgName: string };

  constructor(private docService: DocService) {}

  fileChanged(event: any) {
    this.file = event.target.files[0];
  }

  async verify() {
    this.result = await this.docService.verify(this.file);
  }

  clear() {
    this.file = null;
    this.result = undefined;
  }
}
