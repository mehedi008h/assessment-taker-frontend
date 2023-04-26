import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { CustomHttpRespone } from '../models/custom-http-response';

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

  // get single category
  public getCategory(categoryIdentifier: string): Observable<Category> {
    return this.http.get<Category>(
      `${this.host}/category/${categoryIdentifier}`
    );
  }

  // update category
  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.host}/category`, category);
  }

  // delete category
  public deleteCategory(
    categoryIdentifier: string
  ): Observable<CustomHttpRespone> {
    return this.http.delete<CustomHttpRespone>(
      `${this.host}/category/${categoryIdentifier}`
    );
  }
}
