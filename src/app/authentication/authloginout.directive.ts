import { HostListener } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Directive({
  selector: '[authLogInOut]'
})
export class LogInOutDirective {
  LOGIN_TEXT = 'Log In';
  LOGOUT_TEXT = 'Log Out';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  constructor(private authService: AuthService,
    private router: Router,
    private el: ElementRef) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setInnerText();
    })
  }

  setInnerText() {
    this.el.nativeElement.innerText = this.isLoggedIn ? this.LOGOUT_TEXT : this.LOGIN_TEXT;
  }

  @HostListener('click') onClick() {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.setInnerText();
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

}
