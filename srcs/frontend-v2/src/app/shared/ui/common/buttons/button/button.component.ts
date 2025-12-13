import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  icon = input<string>();
  href = input();
  stylePreset = input<'primary' | 'secondary'>('primary');
  type = input<string>();
  disabled = input<boolean>(false);
  click = output();
}
