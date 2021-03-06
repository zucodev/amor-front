import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Credentials, User } from '../models/';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
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
    let wasRerty = false;
    this.http
      .post(`${apiUrl}/api/auth/ajaxLogin`, credentials, {observe: 'response'})
      .map((response: any) => {
        if (response.status === 200) {
          this.autorized$.next(true);
          this.responseMessage$.next('login' + SUCCESS);
        } else if (response.status === 409) {
          this.autorized$.next(false);
          this.responseMessage$.next('login' + CONFLICT);
        } else if (response.status === 302) {
          this.autorized$.next(true);
          this.responseMessage$.next('login' + SUCCESS);
        } else {
          this.autorized$.next(false);
          this.responseMessage$.next('login' + NOT_AUTORIZED);
        }
        wasRerty = false;
        return response.body;
      })
      .subscribe(
        (response: any) => {
          this.user = response.user;
        },
        (err) => {
          if (err.status === 400) {
            if (!wasRerty) {
              setTimeout(() => {
                this.login(credentials);
              }, 100);
              wasRerty = true;
              return;

            }
          }
          this.autorized$.next(false);
          this.responseMessage$.next('login' + FAILED);
        }
      );
    // this.autorized$.next(true);
    // this.responseMessage$.next('login' + SUCCESS);
  }

  logout() {
    this.http.post(`${apiUrl}/api/auth/ajaxLogout`, {}, { observe: 'response', withCredentials: true }).subscribe(
      (response: HttpResponse<Object>) => {
        if (response.status === 200 || response.status === 401) {
          this.autorized$.next(false);
          this.router.navigate(['/auth']);
          this.responseMessage$.next('');
          this.user = undefined;
        }
      },
      () => {
        this.autorized$.next(false);
        this.router.navigate(['/auth']);
      }
    );
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
    return new Promise(resolve => {
      this.http.post(`${apiUrl}/api/auth/check`, {}, { observe: 'response' }).subscribe(
        (response: HttpResponse<CheckResponse>) => {
          if (response.status === 200 && response.body.user) {
            this.user = response.body;
            resolve(true);
            this.autorized$.next(true);
          } else {
            this.autorized$.next(false);
            resolve(false);
          }
        },
        () => {
          this.autorized$.next(false);
          resolve(false);
          this.responseMessage$.next(FAILED);
        }
      );
    });
  }
}
