import { Routes } from '@angular/router'

const accountRoutes = () =>
  import('./modules/account/account.routes').then(r => r.routes)

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'account' },
  { path: 'account', loadChildren: accountRoutes },
]
