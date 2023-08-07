import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function UsernameValidator(userNames: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const userName = control.get('userName')?.value;
    if (userNames.includes(userName)) {
      return { userNameNotAvailable: true };
    }
    return null;
  };
}
