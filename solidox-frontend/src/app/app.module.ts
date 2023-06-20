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
import { VerifyPageComponent } from './dashboard/pages/verify-page/verify-page.component';
import { SettingsPageComponent } from './dashboard/pages/settings-page/settings-page.component';
import { BannerComponent } from './dashboard/components/banner/banner.component';
import { IssuePageComponent } from './dashboard/pages/issue-page/issue-page.component';
import { FormsModule } from '@angular/forms';

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
    VerifyPageComponent,
    SettingsPageComponent,
    BannerComponent,
    IssuePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
