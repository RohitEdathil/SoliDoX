import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  lockLottie: AnimationOptions = {
    path: 'assets/lottie/lock.json',
  };

  async login() {
    await this.userService.login();
  }
}
