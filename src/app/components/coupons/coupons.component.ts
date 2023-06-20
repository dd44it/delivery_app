import { Component } from '@angular/core';
import { Coupon } from 'src/app/Shop';

@Component({
  selector: 'app-coupons',
  templateUrl: 'coupons.component.html'
})
export class CouponsComponent {
  coupons: Coupon[] = [];
  resultResponse = "";

}
