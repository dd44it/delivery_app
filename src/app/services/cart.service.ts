import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Product } from "../Shop";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {}

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  addToCart(product: Product): void {
    this.cart.push(product);
    this.cartItemCount.next(this.cart.length);
  }
}
