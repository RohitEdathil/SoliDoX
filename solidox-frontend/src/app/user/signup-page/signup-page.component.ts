import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { NotifService } from 'src/app/notif/notif.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent {
  name: string = '';
  email: string = '';

  constructor(
    private userService: UserService,
    private notifService: NotifService
  ) {}

  signup() {
    if (!this.name || !this.email) {
      this.notifService.error('Fill in all the fields');
      return;
    }

    this.userService.signup(this.name, this.email);
  }
}
