import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
      name: [''],
      email: [''],
      password: ['']
    })
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.authService.register(this.registerForm.value).subscribe((res) => {
      if (res.result) {
        this.registerForm.reset()
        this.router.navigate(['login']);
      }
    })
  }
}
