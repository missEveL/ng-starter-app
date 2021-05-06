import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.registerForm= this.formBuilder.group({
      username: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  registerUser() {
    const newUser = new User(this.registerForm.controls['username'].value, 
                              this.registerForm.controls['password'].value, 
                              this.registerForm.controls['email'].value);

    this.authService.register(newUser).subscribe(() => {
      this.registerForm.reset();
      this.router.navigate(['login']);
    });
  }
}
