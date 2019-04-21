import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') showDropdown: boolean = false;

  @HostListener('click') toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }

  constructor() { }

}
