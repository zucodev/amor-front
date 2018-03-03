import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/';
import { CONFLICT, FAILED, NOT_AUTORIZED, SUCCESS } from '../../../constants';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  status: string;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForm();
    this.authService.responseMessage$.subscribe(message => {
      this.status = message;
      switch (message) {
        case 'login' + SUCCESS:
          this.router.navigate(['/transactions']);
          break;
          case 'login' + NOT_AUTORIZED:
          this.message = 'Wrong credentials';
          break;
          case 'login' + CONFLICT:
          this.message = 'Conformation code reqiured';
          break;
          case 'login' + FAILED:
          this.message = 'Login failed';
          break;

        default:
          break;
      }
    });
  }

  onClick(event: Event) {
    event.preventDefault();
    this.authService.login(this.loginForm.value);
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
      code: ''
    });
  }

  ngOnInit() {}
}
