import { Highlightable } from '@angular/cdk/a11y'
import { Directive, booleanAttribute, input, signal } from '@angular/core'
import { nextUniqueIdFactory } from '../../utils/next-unique-id'

const nextUniqueId = nextUniqueIdFactory()

@Directive({
  selector: '[huiMenuItem]',
  exportAs: 'huiMenuItem',
  standalone: true,
  host: {
    role: 'menuitem',
    '[attr.id]': 'id()',
    '[attr.aria-disabled]': 'disabledSig()',
    '[attr.data-headlessui-state]': 'disabledSig() ? "disabled" : null',
    '[attr.tabindex]': '-1',
  },
})
export class MenuItemComponent implements Highlightable {
  readonly #active = signal(false)
  readonly active = this.#active.asReadonly()

  readonly id = input(`headlessui-menu-item-${nextUniqueId()}`)
  readonly disabledSig = input(false, { alias: 'disabled', transform: booleanAttribute })
  // TODO: remove this in favor of the signal once "Highlightable" interface supports signals
  get disabled(): boolean {
    return this.disabledSig()
  }

  setActiveStyles(): void {
    this.#active.set(true)
  }

  setInactiveStyles(): void {
    this.#active.set(false)
  }
}
