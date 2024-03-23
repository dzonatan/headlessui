import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'home-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container mx-auto my-24">
      <div class="prose">
        <h2>Examples</h2>

        <ul>
          <li>
            <h3 class="text-xl">Menu</h3>
            <a routerLink="/menu">Menu</a>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class HomePageComponent {}
