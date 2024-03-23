import { NgClass } from '@angular/common'
import { Component } from '@angular/core'
import { MenuModule } from '@headlessui/angular'
import { CustomMenuItemComponent } from '../../components/custom-menu-item.component'

@Component({
  selector: 'menu-page',
  standalone: true,
  imports: [MenuModule, CustomMenuItemComponent, NgClass],
  template: `
    <div class="flex h-full w-screen justify-center bg-gray-50 p-12">
      <div class="relative inline-block text-left">
        <hui-menu #menu>
          <span class="rounded-md shadow-sm">
            <button
              huiMenuButton
              class="focus:shadow-outline-blue inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out hover:text-gray-500 focus:border-blue-300 focus:outline-none active:bg-gray-50 active:text-gray-800"
            >
              <span>Options</span>
              <svg class="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>

          @if (menu.isOpen()) {
            <hui-menu-items
              class="absolute right-0 mt-2 block w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg outline-none"
            >
              <div class="px-4 py-3">
                <p class="text-sm leading-5">Signed in as</p>
                <p class="truncate text-sm font-medium leading-5 text-gray-900">
                  tom&#64;example.com
                </p>
              </div>

              <div class="py-1">
                <a customMenuItem href="#account-settings">
                  TODO: apply style here
                  <span>Account settings</span>
                  <!--<kbd className={classNames('font-sans', active && 'text-indigo-50')}>⌘K</kbd>-->
                </a>

                <a
                  huiMenuItem
                  #menuItemB="huiMenuItem"
                  href="#support"
                  class="flex w-full justify-between px-4 py-2 text-left text-sm leading-5"
                  [ngClass]="{
                    'bg-indigo-500 text-white': menuItemB.active(),
                    'text-gray-700': !menuItemB.active(),
                    'cursor-not-allowed opacity-50': menuItemB.disabled
                  }"
                >
                  <span [class.font-bold]="menuItemB.active()">Support</span>
                  <!--<kbd className={classNames('font-sans', active && 'text-indigo-50')}>⌘K</kbd>-->
                </a>

                <a
                  huiMenuItem
                  #menuItemC="huiMenuItem"
                  href="#new-feature"
                  class="flex w-full justify-between px-4 py-2 text-left text-sm leading-5"
                  [ngClass]="{
                    'bg-indigo-500 text-white': menuItemC.active(),
                    'text-gray-700': !menuItemC.active(),
                    'cursor-not-allowed opacity-50': menuItemC.disabled
                  }"
                  disabled
                >
                  <span [class.font-bold]="menuItemC.active()">New feature (soon)</span>
                  <!--<kbd className={classNames('font-sans', active && 'text-indigo-50')}>⌘K</kbd>-->
                </a>

                <a
                  huiMenuItem
                  #menuItemD="huiMenuItem"
                  href="#license"
                  class="flex w-full justify-between px-4 py-2 text-left text-sm leading-5"
                  [ngClass]="{
                    'bg-indigo-500 text-white': menuItemD.active(),
                    'text-gray-700': !menuItemD.active(),
                    'cursor-not-allowed opacity-50': menuItemD.disabled
                  }"
                >
                  <span [class.font-bold]="menuItemD.active()">License</span>
                  <!--<kbd className={classNames('font-sans', active && 'text-indigo-50')}>⌘K</kbd>-->
                </a>
              </div>
              <div class="py-1">
                <!--<CustomMenuItem href="#sign-out">Sign out</CustomMenuItem>-->
              </div>
            </hui-menu-items>
          }
        </hui-menu>
      </div>
    </div>
  `,
})
export class MenuPageComponent {}
