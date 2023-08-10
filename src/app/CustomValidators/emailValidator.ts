import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function EmailValidator(emails: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.get('email')?.value;
    if (emails.includes(email)) {
      return { userWithEmailExists: true };
    }
    return null;
  };
}
