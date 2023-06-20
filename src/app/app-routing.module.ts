import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { CartComponent } from "./components/cart/cart.component";
import { HistoryComponent } from './components/history/history.component';
import { CouponsComponent } from './components/coupons/coupons.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "history",
    component: HistoryComponent,
  },
  {
    path: "coupons",
    component: CouponsComponent,
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
