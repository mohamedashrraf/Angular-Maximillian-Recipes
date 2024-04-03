import { Directive, HostBinding, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

   @Input() isOpen = false; // Allow setting initial state from outside

  @HostBinding('class.open') get openClass() {
    return this.isOpen; // Concise getter for open class binding
  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
