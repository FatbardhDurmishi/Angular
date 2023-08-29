import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/interfaces';
import { PasswordMatchValidator } from '../CustomValidators/passwordMatchValidator';
import { UserService } from '../services/userService';
import { UsernameValidator } from '../CustomValidators/userNameValidator';
import { EmailValidator } from '../CustomValidators/emailValidator';
import { NumbersOnlyValidator } from '../CustomValidators/numbersOnlyValidator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {
    this.updateData();
  }

  users: User[] = [];
  userNames: string[] = [];
  emails: string[] = [];

  registerForm!: FormGroup;

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const newUser: User = {
        id: this.users.length + 1,
        userName: formValue.userName,
        email: formValue.email,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
        jobPosition: formValue.role === 'Admin' ? '' : formValue.jobPosition,
        creditCard: formValue.creditCard,
        gender: formValue.gender,
        role: formValue.role,
      };
      this.userService.addUser(newUser);
      this.updateData();
      this.registerForm.reset();
      this.initializeForm();
      this.router.navigate(['/login']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  initializeForm(): void {
    this.registerForm = new FormGroup(
      {
        userName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        jobPosition: new FormControl('', Validators.required),
        creditCard: new FormControl('', [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ]),
        gender: new FormControl(Validators.required),
        role: new FormControl(Validators.required),
      },
      {
        validators: [
          PasswordMatchValidator(),
          UsernameValidator(this.userNames),
          EmailValidator(this.emails),
          NumbersOnlyValidator(),
        ],
      }
    );
    this.registerForm.get('role')?.valueChanges.subscribe((role) => {
      this.changeJobValidation();
    });
  }

  private updateData(): void {
    this.userService.users$.subscribe((res) => {
      this.users = res;
    });
    this.userNames = this.users.map((user) => user.userName);
    this.emails = this.users.map((user) => user.email);
  }

  changeJobValidation() {
    const userRole = this.registerForm.controls['role'].value;
    if (userRole === 'Admin') {
      this.registerForm.controls['jobPosition'].clearValidators();
      this.registerForm.controls['jobPosition'].updateValueAndValidity();
    } else {
      this.registerForm.controls['jobPosition'].setValidators(
        Validators.required
      );
      this.registerForm.controls['jobPosition'].updateValueAndValidity();
    }
  }
}
