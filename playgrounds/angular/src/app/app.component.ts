import { Component, ViewEncapsulation } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `,
})
export class AppComponent {}
