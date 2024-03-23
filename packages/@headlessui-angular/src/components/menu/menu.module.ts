import { NgModule } from '@angular/core'
import { MenuButtonComponent } from './menu-button.component'
import { MenuItemComponent } from './menu-item.directive'
import { MenuItemsComponent } from './menu-items.component'
import { MenuComponent } from './menu.component'

@NgModule({
  imports: [MenuComponent, MenuButtonComponent, MenuItemsComponent, MenuItemComponent],
  exports: [MenuComponent, MenuButtonComponent, MenuItemsComponent, MenuItemComponent],
})
export class MenuModule {}
