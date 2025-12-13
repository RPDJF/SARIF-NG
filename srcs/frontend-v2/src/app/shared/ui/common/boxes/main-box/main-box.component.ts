import { Component } from '@angular/core';

@Component({
  selector: 'app-main-box',
  standalone: true,
  imports: [],
  templateUrl: './main-box.component.html',
  host: {
    class:
      'bg-panel dark:bg-[#161D37] rounded-xl p-12 flex flex-col justify-center items-center gap-y-8 shadow-lg border border-solid border-[#32384F]',
  },
})
export class MainBoxComponent {}
