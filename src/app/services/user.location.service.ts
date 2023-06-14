import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, catchError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserLocationService {
  private key = ''
  private apiURL =`https://api.geoapify.com/v1/ipinfo?apiKey=${this.key}`;

  constructor(private http: HttpClient) {}

  getUserLocation(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL).pipe(
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

  getUserAddress(address: string): Observable<any[]> {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=${this.key}`;
    return this.http.get<any[]>(url).pipe(
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

  getAddressFromLocation(lat: number, lon: number): Observable<any[]> {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${this.key}&lang=uk`;
    return this.http.get<any[]>(url).pipe(
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
