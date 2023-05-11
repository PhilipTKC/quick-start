import { inject, customAttribute } from "aurelia";

/*
* This custom attribute is used to lazy load images
* This custom attribute needs to be used in conjunction with markdown-it-data-attributes and markdown-it-image-dimensions for it work.
* see markdown.config.ts for more details
* Requires Refactoring
*/

@inject(Element)
@customAttribute('lazy-load')
export class LazyLoadObserverCustomAttribute {
  private observer: IntersectionObserver;

  private markdownElement: HTMLElement;

  constructor(markdownElement: HTMLElement) {
    this.markdownElement = markdownElement;
  }

  binding() {
    this.observer = new IntersectionObserver(entries => this.handleIntersection(entries), {
      rootMargin: "0px 0px 0px 0px",
    });

    const elements = this.markdownElement.querySelectorAll('[data-key],[data-key-content]');

    elements.forEach((element: HTMLElement) => {

      // Check if the target contains a child
      // If the target contains a child, then we need to check if the child is an image
      // If the child is an image, then we need to set the src attribute to the data-src attribute

      const children = Array.from(element.children);

      if (children.length > 0) {
        children.forEach(child => {
          if (child.tagName === 'IMG') {
            this.observer.observe(child);
          }
        })
      }
    });
  }

  unbinding() {
    this.observer.disconnect();
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        // Images are wrapped in a paragraph tag with a data-key-content attribute
        const target = entry.target as HTMLImageElement;

        target.src = target.dataset.src;
        this.observer.unobserve(entry.target);

      };
    });
  }
}
