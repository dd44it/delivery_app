import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
})
export class HeaderComponent implements OnInit {
  cartItemCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItemCount().subscribe((count) => {
      this.cartItemCount = count;
    });

    const localStCartCount = localStorage.getItem("count");
    if (localStCartCount) {
      this.cartItemCount = +localStCartCount;
    }
  }
}
