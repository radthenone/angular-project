import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements OnInit {
  public userSubject: BehaviorSubject<IUser | null>;
  public user: Observable<IUser | null>;
  userUrl: string = '';
  headers: HttpHeaders = new HttpHeaders();

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiService,
  ) {
    this.userSubject = new BehaviorSubject<IUser | null>(null);
    this.user = this.userSubject.asObservable();

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const { userId } = JSON.parse(accessToken);

      this.getUserById(userId).subscribe((user) => {
        this.userSubject.next(user);
      });
    }
  }

  ngOnInit(): void {
    this.userUrl = `${this.apiService.baseURL}/users`;
    this.headers = new HttpHeaders();
  }

  getUserById(userId: number): Observable<IUser> {
    const url = `${this.userUrl}/${userId}`;
    return this.http.get<IUser>(url).pipe(
      catchError((error) => {
        console.error('Get user error:', error);
        return throwError(() => new Error(error.message));
      }),
    );
  }
}
