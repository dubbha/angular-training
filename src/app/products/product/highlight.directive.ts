import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() seconds: number;

  private el: HTMLElement;

  constructor(
    elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.el = elementRef.nativeElement;
  }

  @HostListener('click')
  onClick() {
    this.renderer.setStyle(this.el, 'transition', `background-color ${this.seconds / 2}s ease-out`);

    this.renderer.removeClass(this.el, 'product__button_available');
    this.renderer.addClass(this.el, 'product__button_highlighted');

    setTimeout(() => {
      this.renderer.removeClass(this.el, 'product__button_highlighted');
      this.renderer.addClass(this.el, 'product__button_available');
    }, (this.seconds / 2) * 1000);
  }
}
