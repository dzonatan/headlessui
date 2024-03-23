import { Directive, inject } from '@angular/core'
import { MenuItemComponent } from '@headlessui/angular'

@Directive({
  selector: '[customMenuItem]',
  standalone: true,
  hostDirectives: [MenuItemComponent],
  host: {
    class: 'flex w-full justify-between px-4 py-2 text-left text-sm leading-5',
    '[class.text-gray-700]': '!menuItem.active()',
    '[class.bg-indigo-500]': 'menuItem.active()',
    '[class.text-white]': 'menuItem.active()',
    '[class.cursor-not-allowed]': 'menuItem.disabled',
    '[class.opacity-50]': 'menuItem.disabled',
  },
})
export class CustomMenuItemComponent {
  readonly menuItem = inject(MenuItemComponent, { self: true })
}
