import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator, ValidationErrors, ValidatorFn } from '@angular/forms';
import { InputvalidaionService } from '../validation/inputvalidaion.service';
@Directive({
    selector: '[appMobileFirstFiveNotAllowedDirective]'
})
export class MobileFirstFiveNotAllowedDirectiveDirective {

    constructor(
        private el: ElementRef,
        private val: InputvalidaionService
    ) { }

    public validate(control: AbstractControl): ValidationErrors | null {
        const pattern = /^[0-5]/;
        const inputValue = control.value;
        const isValid = pattern.test(inputValue);
        if (isValid) {
            return isValid ? null : { isMobilecheck: false };
        } else {
            return isValid ? null : { isMobilecheck: true };
        };
    }
    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const inputValue = this.el.nativeElement.value;
        if (inputValue.length == 10) {
            const chck = this.val.mobileNumCheck(inputValue);
            if (chck) {
                event.preventDefault();
            }
            else {
                this.el.nativeElement.value = "";//inputValue.substring(1);                
                event.preventDefault();
            }
        }
        else {
            if (/^[0-5]/.test(inputValue)) {
                this.el.nativeElement.value = inputValue.substring(1); // Remove the first character
                event.preventDefault();
            }
        }

        // if (/^[0-5]/.test(inputValue)) {
        //     this.el.nativeElement.value = inputValue.substring(1); // Remove the first character
        //     event.preventDefault();
        // }

    }

}
