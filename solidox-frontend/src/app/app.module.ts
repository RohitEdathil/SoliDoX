import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { LottieModule } from 'ngx-lottie';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { SignupPageComponent } from './user/signup-page/signup-page.component';
import { NotifBarComponent } from './notif/notif-bar/notif-bar.component';
import { DashboardPageComponent } from './dashboard/pages/dashboard-page/dashboard-page.component';
import { UserService } from './user/user.service';
import { NavComponent } from './dashboard/components/nav/nav.component';
import { BulkIssuePageComponent } from './dashboard/pages/bulk-issue-page/bulk-issue-page.component';
import { BulkVerifyPageComponent } from './dashboard/pages/bulk-verify-page/bulk-verify-page.component';

export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    NotifBarComponent,
    DashboardPageComponent,
    NavComponent,
    BulkIssuePageComponent,
    BulkVerifyPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],

  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (userService: UserService) => () =>
        userService.attemptPersistantLogin(),
      deps: [UserService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
