import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../models/user'


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  API_URL: string = 'http://localhost:8080/api';
  SIGNUP_URL: string = `${this.API_URL}/auth/signup`;
  SIGNIN_URL: string = `${this.API_URL}/auth/signin`;
  USER_PROFILE_URL: string = `${this.API_URL}/test/user`;
  ACCESS_TOKEN_KEY: string = 'x-access-token';
  USER_PROFILE_ROUTE: string = '/profile';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient,public router: Router){}

  register(user: User): Observable<any> {
    return this.httpClient.post(this.SIGNUP_URL, user).pipe(
        catchError(this.handleError)
    )
  }

  login(user: User) {
    return this.httpClient.post<any>(this.SIGNIN_URL, user)
      .subscribe((res: any) => {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, res.accessToken);
        this.getUserProfile(res.id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate([`${this.USER_PROFILE_ROUTE}/${res.id}`]);
        })
      })
  }

  getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem(this.ACCESS_TOKEN_KEY) == null) {
      this.router.navigate(['']);
    }
  }

  getUserProfile(id): Observable<any> {
    if(!this.headers.has(this.ACCESS_TOKEN_KEY))
      this.headers = this.headers.append(this.ACCESS_TOKEN_KEY,this.getAccessToken());
    return this.httpClient
            .get(`${this.USER_PROFILE_URL}/${id}`, { headers: this.headers })
            .pipe(
                map((res: Response) => {
                      return res || {}
                }),
            catchError(this.handleError)
            )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}