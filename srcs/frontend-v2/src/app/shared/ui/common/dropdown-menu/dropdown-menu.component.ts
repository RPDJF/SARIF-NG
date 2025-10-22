import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-menu.component.html',
})
export class DropdownMenuComponent implements AfterViewChecked {
  #eRef = inject(ElementRef);

  ready = false;
  close = output();

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
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
