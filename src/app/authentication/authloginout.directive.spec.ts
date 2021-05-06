import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from '../header/header.component';
import { LogInOutDirective } from './authloginout.directive';

describe('LogoutDirective', () => {
  let fixture: ComponentFixture<HeaderComponent>
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ HeaderComponent, LogInOutDirective ],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(HeaderComponent);
    fixture.detectChanges(); // initial binding
  });
});
