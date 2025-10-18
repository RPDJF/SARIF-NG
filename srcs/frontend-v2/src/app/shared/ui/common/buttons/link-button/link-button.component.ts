import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-link-button',
  standalone: true,
  imports: [],
  templateUrl: './link-button.component.html',
})
export class LinkButtonComponent {
  public icon = input<string>();
  public href = input();
  public click = output();
}
