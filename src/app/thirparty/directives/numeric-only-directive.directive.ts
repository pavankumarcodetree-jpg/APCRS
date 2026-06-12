import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appNumericOnlyDirective]'
})
export class NumericOnlyDirectiveDirective {
    constructor(
        private el: ElementRef,

    ) { }

    @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
        const pastedText = event.clipboardData?.getData('text/plain');
        const onlyNumeric = pastedText?.replace(/[^\d]/g, ''); // Remove non-numeric characters
        document.execCommand('insertText', false, onlyNumeric); // Insert only numeric characters
        event.preventDefault(); // Prevent default paste behavior
    }
}
