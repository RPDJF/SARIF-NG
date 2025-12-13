import { Component, output } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu-button',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-menu-button.component.html',
  host: {
    class: 'w-full',
  },
})
export class DropdownMenuButtonComponent {
  click = output<void>();
}
