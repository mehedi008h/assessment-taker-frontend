import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PageResponse } from '../models/page.response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // get all user
  public getUsers(
    keyword: string,
    currentPage: number,
    pazeSize: number
  ): Observable<PageResponse<User>> {
    return this.http.get<PageResponse<User>>(
      `${this.host}/user?keyword=${keyword}&page=${currentPage}&size=${pazeSize}`
    );
  }
}
