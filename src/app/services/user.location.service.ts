import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError, catchError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserLocationService {
  private netlifyURLMap = '/.netlify/functions/fetch-map';
  private netlifyURLUserAddress = '/.netlify/functions/fetch-user-address';
  private netlifyURLAddressFromLocation = '/.netlify/functions/fetch-address-from-location';
  private netlifyURLAutoCompleteAddress = '/.netlify/functions/fetch-autocomplete-address';

  constructor(private http: HttpClient) {}

  getUserLocation(): Observable<any[]> {
    return this.http.get<any[]>(this.netlifyURLMap).pipe(
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
    let params = new HttpParams()
    params = params.append('address', address)
    const baseUrl = window.location.origin
    const url = `${baseUrl}${this.netlifyURLUserAddress}`
    return this.http.get<any[]>(url, { params }).pipe(
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
    let params = new HttpParams()
    params = params.append('lat', lat)
    params = params.append('lon', lon)
    const baseUrl = window.location.origin
    const url = `${baseUrl}${this.netlifyURLAddressFromLocation}`
    return this.http.get<any[]>(url, { params }).pipe(
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

  getAutoCompleteAddress(userAddress: string): Observable<any[]> {
    let params = new HttpParams();
    params = params.append('userAddress', userAddress);
    const baseUrl = window.location.origin;
    const url = `${baseUrl}${this.netlifyURLAutoCompleteAddress}`;
    return this.http.get<any[]>(url, { params }).pipe(
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
