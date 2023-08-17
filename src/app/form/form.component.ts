import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/interfaces';
import { PasswordMatchValidator } from '../CustomValidators/passwordMatchValidator';
import { UserService } from '../services/userService';
import { UsernameValidator } from '../CustomValidators/userNameValidator';
import { EmailValidator } from '../CustomValidators/emailValidator';
import { NumbersOnlyValidator } from '../CustomValidators/numbersOnlyValidator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private userService: UserService) {
    this.updateData();
  }

  users: User[] = [];
  userNames: string[] = [];
  emails: string[] = [];

  userForm!: FormGroup;
  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const newUser: User = {
        id: this.users.length + 1,
        userName: formValue.userName,
        email: formValue.email,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
        jobPosition: formValue.jobPosition,
        creditCard: formValue.creditCard,
      };
      this.userService.addUser(newUser);
      this.updateData();
      this.userForm.reset();
      this.initializeForm();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  initializeForm(): void {
    this.userForm = new FormGroup(
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
  }

  private updateData(): void {
    this.users = this.userService.getUsers();
    this.userNames = this.users.map((user) => user.userName);
    this.emails = this.users.map((user) => user.email);
  }
}
