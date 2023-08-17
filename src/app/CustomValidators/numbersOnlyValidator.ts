import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function NumbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const creditCard = control.get('creditCard')?.value;

    if (isNaN(creditCard)) {
      return { creditCardNotNumber: true };
    }

    return null;
  };
}
