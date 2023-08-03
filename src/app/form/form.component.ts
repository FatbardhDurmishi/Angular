import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/interfaces';
import { PasswordMatchValidator } from '../CustomValidators/passwordMatchValidator';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private userService: UserService) {}
  userForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.userForm = new FormGroup(
      {
        userName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        jobPosition: new FormControl('', Validators.required),
        creditCard: new FormControl('', [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16),
        ]),
      },
      { validators: PasswordMatchValidator() }
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const newUser: User = {
        id: this.userService.getUsersLength() + 1,
        userName: formValue.userName,
        email: formValue.email,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
        jobPosition: formValue.jobPosition,
        creditCard: formValue.creditCard,
      };
      this.userService.addUser(newUser);
      this.userForm.reset();
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
