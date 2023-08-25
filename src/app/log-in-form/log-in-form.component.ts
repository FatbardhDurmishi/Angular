import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css'],
})
export class LogInFormComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  loginForm!: FormGroup;
  formSubmitted: boolean = false;

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.formSubmitted = false;
  }

  login() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const loginSuccess = this.userService.login(
        formValue.email,
        formValue.password
      );
      if (!loginSuccess) {
        this.loginForm.setErrors({ userNotValid: true });
        this.formSubmitted = true;
        return;
      }
      const user = this.userService.getUserByEmail(formValue.email);
      if (user !== undefined) {
        this.userService.setCurrentUser(user);
        if (user?.role == 'Admin') {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/profile']);
        }
      }
    } else {
      this.loginForm.markAllAsTouched();
      this.formSubmitted = true;
    }
  }
}
