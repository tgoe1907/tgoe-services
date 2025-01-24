import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MonthComponent } from './calendar/month/month.component';
import { LoginPageComponent } from "./user-management/login-page/login-page.component";

@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
    AppRoutingModule,
    FormsModule,
    MonthComponent, LoginPageComponent], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
