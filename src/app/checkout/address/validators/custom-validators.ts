import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const emailControl = c.get('email');
    const emailConfirmControl = c.get('confirmEmail');

    if (emailControl.pristine || emailConfirmControl.pristine) {
      return null;
    }

    if (emailControl.invalid || emailConfirmControl.invalid) {
      return null;
    }

    if (emailControl.value.toLowerCase() === emailConfirmControl.value.toLowerCase()) {  // emails are case-insensitive
      return null;
    }

    return { 'emailMatch': true };
  }
}
