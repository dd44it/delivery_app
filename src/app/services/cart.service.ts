import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../Shop";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor() {}

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  addToCart(product: Product): void {
    if (!product.count) product.count = 0;
    const index = this.cart.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      this.cart[index].count += 1;
    } else {
      product.count += 1;
      this.cart.push(product);
    }
    const sumProducts = this.cart.reduce((prevIt, currIt) => prevIt + currIt.count, 0)
    this.cartItemCount.next(sumProducts);
  }

  getCart(): Product[] {
    return this.cart;
  }
}
