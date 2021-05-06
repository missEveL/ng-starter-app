import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  Logout() {
    this.authService.logout();
  }
}
