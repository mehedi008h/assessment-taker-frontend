import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //add new category
  public addCategory(category: Category): Observable<HttpResponse<Category>> {
    return this.http.post<Category>(`${this.host}/category`, category, {
      observe: 'response',
    });
  }

  // get all categories
  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.host}/category`);
  }
}
