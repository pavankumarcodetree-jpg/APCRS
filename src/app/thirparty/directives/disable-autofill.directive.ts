import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDisableAutofill]'
})
export class DisableAutofillDirective {

  @Input() fieldType: 'password' | 'address' | 'other' = 'other';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Set the autocomplete attribute based on the field type
    if (this.fieldType === 'password') {
      this.el.nativeElement.setAttribute('autocomplete', 'new-password');
    } else if (this.fieldType === 'address') {
      this.el.nativeElement.setAttribute('autocomplete', 'off');
    } else {
      this.el.nativeElement.setAttribute('autocomplete', 'off');
    }

    // Optionally, you can clear the value to prevent any residual autofill
    this.el.nativeElement.value = '';
  }

}
