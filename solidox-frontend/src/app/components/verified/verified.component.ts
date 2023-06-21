import { Component, Input } from '@angular/core';
import { Doc } from 'src/app/doc/doc.model';
import { DocService } from 'src/app/doc/doc.service';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.css'],
})
export class VerifiedComponent {
  @Input() result?: { doc: Doc; validity: string; orgName: string };

  constructor(private docService: DocService) {}

  downloadSdx(docId: string) {
    const url = this.docService.getDownloadSdxUrl(docId);
    window.open(url, '_blank');
  }
  downloadFile(docId: string) {
    const url = this.docService.getDownloadFileUrl(docId);
    window.open(url, '_blank');
  }
}
