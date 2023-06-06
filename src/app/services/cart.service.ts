import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Product } from "../Shop";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  private orderUrl = "http://localhost:5000/api/order/";

  constructor(private http: HttpClient) {}

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
    const sumProducts = this.cart.reduce(
      (prevIt, currIt) => prevIt + currIt.count,
      0
    );
    this.cartItemCount.next(sumProducts);
  }

  getCart(): Product[] {
    return this.cart;
  }

  sendDataToDB(data: any): void {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    this.http.post<any>(this.orderUrl, data, httpOptions).subscribe(
      (response) => {
        console.log("Data sent to MongoDB successfully:", response);
        // Perform any additional actions after successful data submission
        // return
      },
      (error) => {
        console.error("Error occurred while sending data to MongoDB:", error);
        // Handle any errors that occurred during data submission
      }
    );
  }
}
