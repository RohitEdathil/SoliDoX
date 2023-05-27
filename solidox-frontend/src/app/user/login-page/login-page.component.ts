import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  userService: UserService;
  router: Router;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  lockLottie: AnimationOptions = {
    path: 'assets/lottie/lock.json',
  };

  async login() {
    await this.userService.login();
  }

  async signup() {
    this.router.navigate(['/signup']);
  }
}
