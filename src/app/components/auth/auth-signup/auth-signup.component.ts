import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/';
import { FAILED, SUCCESS } from '../../../constants';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  signupForm: FormGroup;
  status: string;
  message: string;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm();
    this.authService.responseMessage$.subscribe(message => {
      this.status = message;
      switch (message) {
        case 'signup' + SUCCESS:
          this.message = 'Check you email for conformations code';
          break;
          case 'signup' + FAILED:
          this.message = 'Signup failed';
          break;

        default:
          break;
      }
    });
  }

  onClick(event: Event) {
    event.preventDefault();
    this.authService.signup(this.signupForm.value);
  }

  createForm() {
    this.signupForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {
  }
}
