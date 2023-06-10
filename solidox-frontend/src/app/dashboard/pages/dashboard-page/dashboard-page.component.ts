import { Component } from '@angular/core';
import { Doc } from 'src/app/doc/doc.model';
import { DocService } from 'src/app/doc/doc.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  docs: Doc[] = [];
  searchText = '';

  constructor(private docService: DocService) {}

  async ngOnInit() {
    await this._loadData();
  }

  async _loadData() {
    this.docs = await this.docService.list();
  }

  isMatch(doc: Doc) {
    const text = this.searchText.toLowerCase();
    return doc.name.toLowerCase().startsWith(text);
  }

  get filteredDocs() {
    return this.docs.filter((doc) => this.isMatch(doc));
  }

  async delete(doc: Doc) {}
  async invalidate(doc: Doc) {
    await this.docService.invalidate(doc);
    await this._loadData();
  }

  downloadSdx(doc: Doc) {
    const url = this.docService.getDownloadSdxUrl(doc.id);
    window.open(url, '_blank');
  }
  downloadFile(doc: Doc) {
    const url = this.docService.getDownloadFileUrl(doc.id);
    window.open(url, '_blank');
  }
}
