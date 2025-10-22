import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  inject,
  output,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-menu.component.html',
})
export class DropdownMenuComponent implements AfterViewChecked {
  #platfromId = inject(PLATFORM_ID);
  #eRef = inject(ElementRef);

  ready = false;
  close = output();

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!isPlatformBrowser(this.#platfromId)) return;
    if (this.#eRef.nativeElement.contains(event.target)) {
      this.close.emit();
    } else {
      if (this.ready) this.close.emit();
    }
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.ready = true;
    });
  }
}
