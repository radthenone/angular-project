import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { LoginPayload, RegisterPayload, JwtPayload } from './auth.model';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../users/users.model';
import { sign } from 'jsonwebtoken';
import { environment } from '../environment';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  authUrl: string = '';
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.authUrl = `${this.apiService.baseURL}/auth`;
  }

  generateAccessToken(payload: JwtPayload): string {
    return sign(payload, environment.apiToken, { expiresIn: '1h' });
  }

  register(payload: RegisterPayload): Observable<{ message: string }> {
    return this.http
      .post<{
        message: string;
      }>(`${this.authUrl}/register`, payload, { headers: this.headers })
      .pipe(
        catchError((error) => {
          console.error('Register error:', error);
          return throwError(() => new Error(error.message));
        }),
      );
  }

  login(payload: LoginPayload): Observable<IUser> {
    return this.http
      .post<IUser>(`${this.authUrl}/login`, payload, { headers: this.headers })
      .pipe(
        map((user) => {
          localStorage.setItem(
            'accessToken',
            JSON.stringify({
              accessToken: this.generateAccessToken({
                userId: user.id,
                userEmail: user.email,
              }),
              userId: user.id,
            }),
          );
          this.usersService.userSubject.next(user);
          return user;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => new Error(error.message));
        }),
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.usersService.userSubject.next(null);
    this.router
      .navigateByUrl(`${this.authUrl}/login`)
      .then(() => {
        console.log('Logout successful');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }
}
