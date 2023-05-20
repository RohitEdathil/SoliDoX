import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  scanningLottie: AnimationOptions = {
    path: 'assets/lottie/scanning.json',
  };

  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
