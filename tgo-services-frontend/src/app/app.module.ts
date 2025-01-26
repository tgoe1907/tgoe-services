import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; 
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MonthComponent } from './calendar/month/month.component';
import { LoginPageComponent } from "./user-management/login-page/login-page.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule, AppRoutingModule, FormsModule,
    MonthComponent, LoginPageComponent, RouterModule], 
    providers: [provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync(),
        { provide: LocationStrategy, useClass: PathLocationStrategy },
    ] })
export class AppModule { }
