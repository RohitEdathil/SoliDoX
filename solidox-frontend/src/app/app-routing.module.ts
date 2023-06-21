import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';
import { LoginPageComponent } from './user/login-page/login-page.component';
import { SignupPageComponent } from './user/signup-page/signup-page.component';
import { DashboardPageComponent } from './dashboard/pages/dashboard-page/dashboard-page.component';
import { VerifyPageComponent } from './dashboard/pages/verify-page/verify-page.component';
import { SettingsPageComponent } from './dashboard/pages/settings-page/settings-page.component';
import { IssuePageComponent } from './dashboard/pages/issue-page/issue-page.component';
import { VerifyExtPageComponent } from './home/verify-ext-page/verify-ext-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'verify', component: VerifyPageComponent },
  { path: 'verify-ext', component: VerifyExtPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'issue', component: IssuePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
