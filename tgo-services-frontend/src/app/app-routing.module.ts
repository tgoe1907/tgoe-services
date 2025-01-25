import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './user-management/register-page/register-page.component';
import { LoginPageComponent } from './user-management/login-page/login-page.component';
import { MainComponent } from './main/main/main.component';
import { AuthGuard } from './main/auth.guard';

const routes: Routes = [
  {path: '', component: LoginPageComponent}, 
  {path: 'login', component: LoginPageComponent}, 
  {path: 'register', component: RegisterPageComponent}, 
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
