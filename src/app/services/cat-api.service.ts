import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatApiService {

  header = new HttpHeaders({
    'x-api-key':
      'live_ZaW1NL4iJPqs2eo4BwHuErCWe8rMxQfXQWVY5AMs1nBUiHAGNY9HqTSt1ndt5RCP',
  });

  private apiUrl = 'https://api.thecatapi.com/v1';

  constructor(private http: HttpClient) {
  }

  getBreeds(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/breeds`, {
      headers: this.header,
    }).pipe(
      catchError((error) => {
        return throwError('Error fetching cats', error);
      })
    );
  }

  searchCats(limit: number, breedId: string | null): Observable<any[]> {
    let url = `${this.apiUrl}/images/search?limit=${limit}`;
    if (breedId) {
      url += `&breed_ids=${breedId}`;
    }
    return this.http.get<any[]>(url, {headers: this.header}).pipe(
      catchError((error) => {
        return throwError('Error fetching cats', error);
      })
    );
  }
}
