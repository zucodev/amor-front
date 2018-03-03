import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Credentials, User } from '../models/';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CONFLICT, NOT_AUTORIZED, SUCCESS, FAILED } from '../constants';

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
    this.http.post('/api/auth/ajaxLogin', JSON.stringify(credentials)).subscribe(
      (response: Response) => {
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
    this.autorized$.next(true);
    this.responseMessage$.next('login' + SUCCESS);
  }

  async signup(credentials: Credentials) {
    this.http.post('/api/auth/register', JSON.stringify(credentials)).subscribe(
      (response: HttpResponse<any>) => {
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
    this.http.post('/api/auth/check', {}).subscribe(
      (response: HttpResponse<CheckResponse>) => {
        this.user = response.body;
        if (this.user.wallet) {
          this.autorized$.next(true);
          this.responseMessage$.next(SUCCESS);
        } else {
          this.router.navigate(['/auth']);
        }
      },
      () => {
        this.autorized$.next(false);
        this.responseMessage$.next(FAILED);
      }
    );
    this.user = {
      user: {
        id: 1,
        email: 'test@email.com'
      },
      roles: [],
      wallet: '1Gvc4seXLjyUeVjY9J8tJeM3GFLMWgm8iD'
    };
  }
}