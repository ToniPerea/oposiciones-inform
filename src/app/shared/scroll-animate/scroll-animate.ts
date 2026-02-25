import { Directive, ElementRef, input, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
})
export class ScrollAnimate implements OnInit, OnDestroy {
  readonly delay = input<number>(0);

  private readonly el = inject(ElementRef<HTMLElement>);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    const element = this.el.nativeElement;

    element.classList.add('scroll-animate');

    const delayMs = this.delay();
    if (delayMs > 0) {
      element.style.transitionDelay = `${delayMs}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('in-view');
            this.observer?.disconnect();
            this.observer = null;
          }
        });
      },
      { threshold: 0.12 },
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
