import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getItems(query?: string, page: number = 0): Observable<Item[]> {
    let url = `${this.baseUrl}`;
    if (query) {
      url += `/search?q=${encodeURIComponent(query)}`;
    } else {
      url += `?limit=10&skip=${page * 10}`;
    }
    return this.http.get<any>(url).pipe(
      map(response => response.products || []),
      catchError(this.handleError)
    );
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.status === 404) {
        errorMessage = 'Item not found';
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}