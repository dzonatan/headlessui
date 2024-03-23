import {
  Directive,
  ElementRef,
  Injector,
  afterNextRender,
  booleanAttribute,
  inject,
  input,
} from '@angular/core'
import { Keys } from '../../utils/keyboard'
import { nextUniqueIdFactory } from '../../utils/next-unique-id'
import { setDefaultButtonType } from '../../utils/set-default-button-type'
import { MenuComponent } from './menu.component'

const nextUniqueId = nextUniqueIdFactory()

@Directive({
  selector: '[huiMenuButton]',
  standalone: true,
  host: {
    'aria-haspopup': 'menu',
    '[attr.id]': 'id()',
    '[attr.aria-expanded]': 'menuHost.isOpen()',
    '[attr.aria-controls]': 'menuHost.menuItems()?.id()',
    '[attr.data-headlessui-state]': 'menuHost.isOpen() ? "open" : null',
    '(click)': 'onClick($event)',
    '(keyup)': 'onKeyUp($event)',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class MenuButtonComponent {
  readonly #injector = inject(Injector)
  readonly #elRef = inject(ElementRef, { self: true })
  readonly menuHost = inject(MenuComponent, { host: true })

  readonly id = input(`headlessui-menu-button-${nextUniqueId()}`)
  readonly disabled = input(false, { transform: booleanAttribute })

  constructor() {
    setDefaultButtonType(this.#elRef.nativeElement)
  }

  onClick(event: MouseEvent) {
    if (this.disabled()) return

    if (this.menuHost.isOpen()) {
      this.menuHost.closeMenu()
    } else {
      event.preventDefault()
      this.menuHost.openMenu()
    }
  }

  onKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case Keys.Space:
        // Required for firefox, event.preventDefault() in handleKeyDown for
        // the Space key doesn't cancel the handleKeyUp, which in turn
        // triggers a *click*.
        event.preventDefault()
        break
    }
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      // Ref: https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/#keyboard-interaction-13
      case Keys.Space:
      case Keys.Enter:
      case Keys.ArrowDown:
      case Keys.ArrowUp:
        event.preventDefault()
        event.stopPropagation()
        this.menuHost.openMenu()
        afterNextRender(
          () => {
            if (event.key === Keys.ArrowUp) {
              this.menuHost.menuItems()!.setLastItemActive()
            } else {
              this.menuHost.menuItems()!.setFirstItemActive()
            }
          },
          { injector: this.#injector }
        )
        break
    }
  }

  focus(preventScroll?: boolean) {
    this.#elRef.nativeElement.focus({ preventScroll })
  }
}
