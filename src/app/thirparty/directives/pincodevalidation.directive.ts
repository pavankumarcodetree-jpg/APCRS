import { Directive, forwardRef } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[Pincodevalidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PincodeValidatorDirective),
      multi: true,
    },
  ],
})
export class PincodeValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const data = control.value;
    const regexPattern = new RegExp('^[1-9][0-9]{2}\\s{0,1}[0-9]{3}$');
    const response = regexPattern.test(data);

    if (!response) {
      return { invalidPincode: true };
    }

    const invalidNumbers = [
      '000000',
      '111111',
      '222222',
      '333333',
      '444444',
      '555555',
      '666666',
      '777777',
      '888888',
      '999999',
    ];

    if (invalidNumbers.includes(data)) {
      return { invalidPincode: true };
    }

    return null;
  }
}
