import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appEmptyBorderDirective]'
})
export class EmptyBorderDirectiveDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('blur') onBlur(): void {
    const inputValue = this.el.nativeElement.value;

    // Check if the input is empty, and add a red border if it is
    if (!inputValue.trim()) {
      this.renderer.setStyle(this.el.nativeElement, 'border-color', 'red');
      this.showTooltip();
    } else {
      // Remove the red border and hide the tooltip if the input is not empty
      this.renderer.removeStyle(this.el.nativeElement, 'border-color');
      this.hideTooltip();
    }
  }

  private showTooltip(): void {
    
  }

  private hideTooltip(): void {
     
  }

}
