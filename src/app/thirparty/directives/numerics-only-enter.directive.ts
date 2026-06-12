import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appNumericsOnlyEnter]'
})
export class NumericsOnlyEnterDirective {
    constructor(
        private el: ElementRef,

    ) { }
    @HostListener('input', ['$event']) onInput(event: Event): void {
        const inputValue = this.el.nativeElement.value;
        if (!/^[0-9]*$/.test(inputValue)) {
            event.preventDefault();
            this.el.nativeElement.value = '';
            return;
        }
        else {
            event.preventDefault();
            return;
        }
    }
}
