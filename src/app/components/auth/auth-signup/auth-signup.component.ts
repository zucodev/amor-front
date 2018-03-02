import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm();
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
