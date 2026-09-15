import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';

const BASE_URL = '/api/v1/animals';

@Injectable({ providedIn: 'root' })
export class AnimalService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(BASE_URL);
  }

  add(name: string, favoriteColor: string): Observable<Animal> {
    return this.http.post<Animal>(BASE_URL, { name, favoriteColor });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }
}
