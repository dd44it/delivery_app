import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError, catchError } from "rxjs";
import { Product } from "../Shop";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  // local url
  // private orderUrl = "http://localhost:5000/api/order/";
  // netlify url
  private orderUrl = "/.netlify/functions/fetch-order";
  private getOrdersUrl = "/.netlify/functions/fetch-get-orders";

  constructor(private http: HttpClient) {}

  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }

  addToCart(product: Product): void {
    if (!product.count) product.count = 0;
    const cartLocalStorage = localStorage.getItem("cart");
    const countLocalStorage = localStorage.getItem("count");
    if (cartLocalStorage) {
      this.cart = JSON.parse(cartLocalStorage);
    }
    if (countLocalStorage) {
      this.setCountCart(Number(countLocalStorage));
    }
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
    this.setCountCart(sumProducts);
    this.setToLocalStorage("cart", JSON.stringify(this.cart));
    this.setToLocalStorage("count", JSON.stringify(sumProducts));
  }

  getCart(): Product[] {
    return this.cart;
  }

  // send data to netlify function
  sendDataToDB(data: any): Observable<HttpResponse<any>> {
    const { name, email, phone, address, products, finalPrice } = data;
    let params = new HttpParams()
    params = params.append('name', name);
    params = params.append('email', email);
    params = params.append('phone', phone);
    params = params.append('address', address);
    params = params.append('products', JSON.stringify(products));
    params = params.append('finalPrice', finalPrice);

    return this.http.get<any>(this.orderUrl, { params } ).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "Unknown error occurred";
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  // get order from netlify function
  getOrderData(data: any): Observable<any[]> {
    const { email, phone } = data;
    console.log(email, phone)
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('phone', phone);

    return this.http.get<any>(this.getOrdersUrl, { params }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "Unknown error occurred";
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  // get order from localhost node.js
  // getOrderData(data: any): Observable<any[]> {
  //   const { email, phone } = data;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //     }),
  //     observe: "response" as "response",
  //   };

  //   const body = { email, phone };
  //   const url = `${this.orderUrl}orders/`
  //   return this.http.post<any[]>(url, body);
  // }

  resetCart(): void {
    const resetProperty = 0;
    this.cart.length = resetProperty;
    this.cartItemCount.next(resetProperty);
    this.setToLocalStorage("cart", '');
    this.setToLocalStorage("count", '');
  }

  setCountCart(value: number): void {
    this.cartItemCount.next(value);
  }

  setToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // send data with localhost to back node.js 
  // sendDataToDB(data: any): Observable<HttpResponse<any>> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //     }),
  //     observe: "response" as "response",
  //   };
  //   return this.http.post<any>(this.orderUrl, data, httpOptions ).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       let errorMessage = "Unknown error occurred";
  //       if (error.error instanceof ErrorEvent) {
  //         // Client-side error
  //         errorMessage = `Error: ${error.error.message}`;
  //       } else {
  //         // Server-side error
  //         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //       }
  //       console.error(errorMessage);
  //       return throwError(errorMessage);
  //     })
  //   );
  // }

  
}
