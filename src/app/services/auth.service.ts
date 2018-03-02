import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../models/';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  autorized$: Subject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient) {}

  login(credentials: Credentials) {
    // this.http.post('loginURl', JSON.stringify(credentials)).subscribe((response: Response) => {
    //   if (response.status === 200) {
    //     this.autorized$.next(true);
    //   } else {
    //     this.autorized$.next(false);
    //   }
    // });
    this.autorized$.next(true);
  }

  signup(credentials: Credentials) {
    // this.http.post('signupURL', JSON.stringify(credentials)).subscribe((response: Response) => {
    //   console.log('signUp');
    // });
    alert('Write me!');
  }
}
