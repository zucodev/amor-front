import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent  implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm();
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

  ngOnInit() {  }

}
