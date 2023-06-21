import { Component } from '@angular/core';
import { Doc } from 'src/app/doc/doc.model';
import { DocService } from 'src/app/doc/doc.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-verify-ext-page',
  templateUrl: './verify-ext-page.component.html',
  styleUrls: ['./verify-ext-page.component.css'],
})
export class VerifyExtPageComponent {
  file: File | null = null;

  result?: { doc: Doc; validity: string; orgName: string };

  constructor(
    private docService: DocService,
    private userService: UserService
  ) {}

  async verify() {
    await this.userService.attemptLogin();
    this.result = await this.docService.verify(this.file);
  }

  clear() {
    this.file = null;
    this.result = undefined;
  }

  fileChanged(event: any) {
    this.file = event.target.files[0];
  }
}
