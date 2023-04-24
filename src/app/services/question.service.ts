import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from '../models/question.model';
import { PageResponse } from '../models/page.response.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  public host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //add new question
  public addQuestion(question: Question): Observable<HttpResponse<Question>> {
    return this.http.post<Question>(`${this.host}/question`, question, {
      observe: 'response',
    });
  }

  // get question of an assessment => Admin
  public getQuestionsOfAdmin(
    assessmentIdentifier: string,
    keyword: string,
    currentPage: number,
    pazeSize: number
  ): Observable<PageResponse<Question>> {
    return this.http.get<PageResponse<Question>>(
      `${this.host}/question/${assessmentIdentifier}?keyword=${keyword}&page=${currentPage}&size=${pazeSize}`
    );
  }
}
