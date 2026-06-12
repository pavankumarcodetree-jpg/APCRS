import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDateFormatDirective]'
})
export class DateFormatDirectiveDirective{

  constructor(private el: ElementRef) {}

  @Input('appDateFormat') dateFormat: string = 'dd-MM-yyyy';

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    // Check if the input value matches the specified date format
    if (!this.isValidDateFormat(inputValue)) {
      inputElement.value = ''; // Clear the input if it's not a valid date
    }
  }

  private isValidDateFormat(value: string): boolean {
    const datePattern = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
    return datePattern.test(value);
  }

}
