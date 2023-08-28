import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordMatchValidator } from '../CustomValidators/passwordMatchValidator';
import { NumbersOnlyValidator } from '../CustomValidators/numbersOnlyValidator';
import { UsernameValidator } from '../CustomValidators/userNameValidator';
import { EmailValidator } from '../CustomValidators/emailValidator';
import { User } from '../interfaces/interfaces';
import { UserService } from '../services/userService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  enableEdit: boolean = false;
  users: User[] = [];
  userNames: string[] = [];
  emails: string[] = [];
  currentUser!: User;
  editUserForm!: FormGroup;
  avatar!: string;
  enableRoleEdit: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.updateProfileUserData();
    this.initializeForm();
    this.updateUsersData();
  }

  initializeForm(): void {
    this.editUserForm = new FormGroup(
      {
        userName: new FormControl(
          { value: this.currentUser.userName, disabled: !this.enableEdit },
          [Validators.required]
        ),
        email: new FormControl(
          { value: this.currentUser.email, disabled: !this.enableEdit },
          [Validators.required, Validators.email]
        ),
        jobPosition: new FormControl(
          {
            value: this.currentUser.jobPosition,
            disabled: !this.enableEdit,
          },
          Validators.required
        ),
        creditCard: new FormControl(
          { value: this.currentUser.creditCard, disabled: !this.enableEdit },
          [
            Validators.required,
            Validators.maxLength(16),
            Validators.minLength(16),
          ]
        ),
        gender: new FormControl(
          { value: this.currentUser.gender, disabled: !this.enableEdit },
          Validators.required
        ),
        role: new FormControl(
          { value: this.currentUser.role, disabled: !this.enableEdit },
          Validators.required
        ),
      },
      {
        validators: [
          UsernameValidator(this.userNames),
          EmailValidator(this.emails),
          NumbersOnlyValidator(),
        ],
      }
    );
    this.editUserForm.get('gender')?.valueChanges.subscribe((gender) => {
      this.changeAvatar(gender);
    });
  }

  onEnableEdit() {
    this.enableEdit = !this.enableEdit;
    this.initializeForm();
    this.changeJobValidation();
    this.setEnableRoleEdit();
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      const user = {
        id: this.currentUser.id,
        userName: this.editUserForm.value.userName,
        email: this.editUserForm.value.email,
        password: this.currentUser.password,
        confirmPassword: this.currentUser.confirmPassword,
        jobPosition:
          this.editUserForm.value.jobPosition === 'Admin'
            ? ''
            : this.editUserForm.value.jobPosition,
        creditCard: this.editUserForm.value.creditCard,
        gender: this.editUserForm.value.gender,
        role: this.editUserForm.value.role,
      };
      this.userService.updateUser(user);
      this.enableEdit = !this.enableEdit;
      this.setUserAfterEdit(user);
      this.initializeForm();
      this.updateUsersData();
      this.enableRoleEdit = true;
    } else {
      this.editUserForm.markAllAsTouched();
    }
  }

  updateProfileUserData() {
    //me ndryshu logjiken kur profileuser nuk osht null
    this.userService.profileUser$.subscribe((res) => {
      this.currentUser = res!;
    });
    if (this.currentUser === null) {
      this.userService.currentUser$.subscribe((res) => {
        this.currentUser = res!;
      });
    }
    this.changeAvatar(this.currentUser.gender);
  }

  changeAvatar(gender: string) {
    if (gender === 'Male') {
      this.avatar = '../../assets/images/boyAvatar.jpg';
    } else {
      this.avatar = '../../assets/images/girlAvatar.jpg';
    }
  }

  setUserAfterEdit(user: User) {
    var profileUser: User;
    this.userService.profileUser$.subscribe((res) => {
      profileUser = res!;
    });
    debugger;
    if (this.currentUser.role === 'Admin' && profileUser! === null) {
      this.userService.setCurrentUser(user);
    } else {
      this.userService.setProfileUser(user);
    }
  }

  setEnableRoleEdit() {
    debugger;
    var profileUser: User;
    this.userService.profileUser$.subscribe((res) => {
      profileUser = res!;
    });
    if (this.currentUser.role === 'Admin' && profileUser! === null) {
      this.editUserForm.get('role')?.clearValidators();
      this.editUserForm.get('role')?.updateValueAndValidity();
      this.enableRoleEdit = false;
    }
  }

  changeJobValidation() {
    if (this.editUserForm.get('role')?.value === 'Admin') {
      this.editUserForm.get('jobPosition')?.clearValidators();
      this.editUserForm.get('jobPosition')?.updateValueAndValidity();
    }
  }

  updateUsersData() {
    this.userService.users$.subscribe((res) => {
      this.users = res;
    });
    this.users.forEach((user) => {
      if (
        user.email !== this.currentUser.email &&
        user.userName !== this.currentUser.email
      ) {
        this.userNames.push(user.userName);
        this.emails.push(user.email);
      }
    });
  }

  ngOnDestroy() {
    this.userService.setProfileUser(null);
  }
}
