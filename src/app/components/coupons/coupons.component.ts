import { Component, OnInit } from "@angular/core";
import { Coupon } from "src/app/Shop";
import { CouponService } from "src/app/services/coupon.service";

@Component({
  selector: "app-coupons",
  templateUrl: "coupons.component.html",
})
export class CouponsComponent implements OnInit {
  coupons: Coupon[] = [];
  resultResponse = "";
  error: string = "";

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.getAllCoupons();
  }

  getAllCoupons(): void {
    this.couponService.getAllCoupons().subscribe(
      (data: Coupon[]) => {
        this.coupons = data;
      },
      (error: any) => {
        this.error =
          "An error occurred while fetching shops. Please try again later.";
        console.error(error);
      }
    );
  }

  onCopyCode(code: string): void {
    navigator.clipboard.writeText(code);
  }
}
