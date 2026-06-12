import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appPanNumber]',
})
export class PanNumberDirective {

    constructor(private el: ElementRef,
        private control: NgControl,
        private renderer: Renderer2
    ) { }
    @HostListener('blur', ['$event.target.value']) onBlur(value: string) {
        const isValid = /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(value);
        if (this.control && this.control.control) {
            if (!isValid) {
                this.control.control.setErrors({ 'invalidPAN': true });
                //this.renderer.setProperty(this.el.nativeElement, 'value', ''); // Clear input
                // alert('Invalid email format'); // Show alert
                //this.renderer.setProperty(this.el.nativeElement, 'value', '');
            } else {
                this.control.control.setErrors(null);
            }
        }
    }
}
