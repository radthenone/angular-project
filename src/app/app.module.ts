import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [BrowserModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [provideRouter(routes)],
  declarations: [AppComponent, HeaderComponent, UsersComponent, AuthComponent, HomeComponent],
})
export class AppModule {}
