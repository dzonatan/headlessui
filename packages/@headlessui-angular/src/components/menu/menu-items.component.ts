import { ActiveDescendantKeyManager } from '@angular/cdk/a11y'
import {
  AfterContentInit,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  contentChildren,
  inject,
  input,
  signal,
} from '@angular/core'
import { nextUniqueIdFactory } from '../../utils/next-unique-id'
import { MenuItemComponent } from './menu-item.directive'
import { MenuComponent } from './menu.component'

const nextUniqueId = nextUniqueIdFactory()

@Component({
  selector: 'hui-menu-items',
  standalone: true,
  imports: [],
  template: `<ng-content />`,
  host: {
    role: 'menu',
    tabindex: '0',
    '[attr.id]': 'id()',
    '[attr.aria-labelledby]': 'menuHost.menuButton().id()',
    '[attr.aria-activedescendant]': 'ariaActiveDescendant()',
    '(keydown)': 'onKeyDown($event)',
  },
})
export class MenuItemsComponent implements AfterContentInit, OnDestroy {
  #keyManager?: ActiveDescendantKeyManager<MenuItemComponent>

  readonly #elementRef = inject(ElementRef)
  readonly menuHost = inject(MenuComponent, { host: true })

  readonly #activeItem = signal<MenuItemComponent | null>(null)
  readonly ariaActiveDescendant = computed(() => this.#activeItem()?.id() ?? null)

  readonly menuItems = contentChildren(MenuItemComponent, { descendants: true })

  readonly id = input(`headlessui-menu-items-${nextUniqueId()}`)

  ngAfterContentInit() {
    // explicit cast is required here to make FocusKeyManager happy with the type
    // because `contentChildren(T)` returns readonly<T>
    this.#keyManager = new ActiveDescendantKeyManager(this.menuItems() as MenuItemComponent[])
      .withWrap()
      .withHomeAndEnd()
      .withPageUpDown(true, Number.MAX_VALUE)
      .withVerticalOrientation()
    this.#keyManager.change.subscribe(
      () => this.#keyManager?.activeItem && this.#activeItem.set(this.#keyManager.activeItem)
    )
    this.#keyManager.tabOut.subscribe(() => this.menuHost.closeMenu())
    this.#elementRef.nativeElement.focus()
  }

  ngOnDestroy() {
    this.#keyManager?.destroy()
  }

  setFirstItemActive() {
    this.#keyManager?.setFirstItemActive()
  }

  setLastItemActive() {
    this.#keyManager?.setLastItemActive()
  }

  onKeyDown(event: KeyboardEvent) {
    this.#keyManager?.onKeydown(event)
  }
}
