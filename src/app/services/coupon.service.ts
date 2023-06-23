import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Coupon } from "src/app/Shop";

@Injectable({
  providedIn: "root",
})
export class CouponService {
  private apiURL = "http://localhost:5000/api/coupons";

  constructor(private http: HttpClient) {}

  getAllCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.apiURL).pipe(
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

  getCoupon(id: string): Observable<any>{
    const url = `${this.apiURL}/${id}`
    return this.http.get<Coupon[]>(url).pipe(
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
}
