import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Coupon } from "src/app/Shop";

@Injectable({
  providedIn: "root",
})
export class CouponService {
  // private apiURL = "http://localhost:5000/api/coupons";
  // get all coupons
  private urlGetCoupons = "/.netlify/functions/fetch-coupons";

  constructor(private http: HttpClient) {}

  // get all coupons local db with node.js
  // getAllCoupons(): Observable<Coupon[]> {
  //   return this.http.get<Coupon[]>(this.apiURL).pipe(
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

  // get all coupons mongo db cluster with netlify function
  getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.urlGetCoupons).pipe(
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

  // getCoupon(id: string): Observable<any>{
  //   const url = `${this.apiURL}/${id}`
  //   return this.http.get<Coupon[]>(url).pipe(
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

  // updateSelectedCouponCode(id: string): Observable<any>{
  //   const url = `${this.apiURL}/${id}`
  //   return this.http.put<Coupon[]>(url, id).pipe(
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
