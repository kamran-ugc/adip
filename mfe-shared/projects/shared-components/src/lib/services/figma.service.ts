import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FigmaService {
  // private readonly FIGMA_API_URL = 'https://api.figma.com/v1';
  // private readonly accessToken = '';
  // private readonly fileKey = '';

  private http = inject(HttpClient);

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // getNode(nodeId: string): Observable<any> {
  //     return this.http.get(`${this.FIGMA_API_URL}/files/${this.fileKey}/nodes?ids=${nodeId}`, {
  //         headers: {
  //             'X-Figma-Token': this.accessToken
  //         }
  //     }).pipe(
  //         map(response => response),
  //         catchError(this.handleError)
  //     );
  // }

  // getImage(nodeId: string): Observable<any> {
  //     return this.http.get(`${this.FIGMA_API_URL}/files/${this.fileKey}/images?ids=${nodeId}`, {
  //         headers: {
  //             'X-Figma-Token': this.accessToken
  //         }
  //     }).pipe(
  //         map(response => response),
  //         catchError(this.handleError)
  //     );
  // }
}
