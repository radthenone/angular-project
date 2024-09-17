import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
