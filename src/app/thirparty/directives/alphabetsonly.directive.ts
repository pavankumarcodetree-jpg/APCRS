import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appAlphabetsonly]',
})
export class AlphabetsonlyDirective {

    constructor(private el: ElementRef,
        private control: NgControl,
        private renderer: Renderer2
    ) { }
    @HostListener('input', ['$event'])
    onInput(event: any) {
        const input = event.target;
        const regex = /^[a-zA-Z@_ ]*$/;
        const value = input.value;
        if (!regex.test(value)) {
            input.value = value.replace(/[^a-zA-Z@_ ]/g, '');
        }
    }
}
