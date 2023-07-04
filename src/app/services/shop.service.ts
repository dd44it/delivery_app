import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Shop } from "../Shop";

@Injectable({
  providedIn: "root",
})
export class ShopService {
  // private apiURL = "http://localhost:5000/api/shops";
  private apiURL = "/.netlify/functions/fetch-shops";

  constructor(private http: HttpClient) {}

  getAllShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.apiURL).pipe(
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
