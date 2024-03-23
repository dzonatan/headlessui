import { Component, computed, contentChild, signal } from '@angular/core'
import { Keys } from '../../utils/keyboard'
import { MenuButtonComponent } from './menu-button.component'
import { MenuItemsComponent } from './menu-items.component'

export enum MenuStates {
  Open,
  Closed,
}

@Component({
  selector: 'hui-menu',
  standalone: true,
  imports: [],
  template: `<ng-content />`,
  host: {
    '(keydown)': 'onKeyDown($event)',
  },
})
export class MenuComponent {
  readonly #state = signal(MenuStates.Closed)
  readonly state = this.#state.asReadonly()
  readonly isOpen = computed(() => this.state() === MenuStates.Open)

  readonly menuButton = contentChild.required(MenuButtonComponent)
  readonly menuItems = contentChild(MenuItemsComponent)

  openMenu() {
    this.#state.set(MenuStates.Open)
  }

  closeMenu() {
    this.#state.set(MenuStates.Closed)
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      // Ref: https://www.w3.org/WAI/ARIA/apg/patterns/menu/#keyboard-interaction-12

      case Keys.Escape:
        event.preventDefault()
        event.stopPropagation()
        this.closeMenu()
        this.menuButton().focus(true)
        break
    }
  }
}
