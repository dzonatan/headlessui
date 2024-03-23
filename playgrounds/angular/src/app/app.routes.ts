import { Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page.components'
import { MenuPageComponent } from './pages/menu/menu-page.component'

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'menu', component: MenuPageComponent },
]
