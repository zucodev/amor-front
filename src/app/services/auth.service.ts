import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Credentials, User } from '../models/';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CONFLICT, NOT_AUTORIZED, SUCCESS, FAILED } from '../constants';
import { apiUrl } from './globals';

interface CheckResponse {
  user: User;
  roles: Array<string>;
  wallet: string;
}

@Injectable()
export class AuthService {
  autorized$: Subject<boolean> = new BehaviorSubject(false);
  responseMessage$: Subject<string> = new BehaviorSubject('');
  user: CheckResponse;
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: Credentials) {
    this.http.post(`${apiUrl}/api/auth/ajaxLogin`, credentials, { observe: 'response' }).subscribe(
      (response: HttpResponse<Object>) => {
        if (response.status === 200) {
          this.autorized$.next(true);
          this.responseMessage$.next('login' + SUCCESS);
        } else if (response.status === 409) {
          this.autorized$.next(false);
          this.responseMessage$.next('login' + CONFLICT);
        } else if (response.status === 403) {
          this.autorized$.next(false);
          this.responseMessage$.next('login' + NOT_AUTORIZED);
        }
      },
      () => {
        this.autorized$.next(false);
        this.responseMessage$.next('login' + FAILED);
      }
    );
    // this.autorized$.next(true);
    // this.responseMessage$.next('login' + SUCCESS);
  }

  logout() {
    this.autorized$.next(false);
    this.router.navigate(['/auth']);
  }

  signup(credentials: Credentials) {
    this.http.post('/api/auth/register', credentials, { observe: 'response' }).subscribe(
      (response: HttpResponse<Object>) => {
        if (response.status === 200) {
          this.autorized$.next(true);
          this.responseMessage$.next('signup' + SUCCESS);
        } else {
          this.autorized$.next(false);
          return FAILED;
        }
      },
      () => {
        this.autorized$.next(false);
        this.responseMessage$.next('signup' + FAILED);
      }
    );
    this.responseMessage$.next('signup' + SUCCESS);
  }

  async check() {
    this.http.post(`${apiUrl}/api/auth/check`, {}, { observe: 'response' }).subscribe(
      (response: HttpResponse<CheckResponse>) => {
        if (response.status === 200 && response.body.user) {
          this.user = response.body;
          this.autorized$.next(true);
          if (this.router.url === '/auth') {
            this.router.navigate(['/transactions']);
          }
        } else {
          this.autorized$.next(false);
          this.router.navigate(['/auth']);
        }
      },
      () => {
        this.autorized$.next(false);
        this.responseMessage$.next(FAILED);
      }
    );
  }
}
