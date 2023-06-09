import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assessment } from '../models/assessment.model';
import { PageResponse } from '../models/page.response.model';
import { CustomHttpRespone } from '../models/custom-http-response';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class AssessmentService {
  public host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //add new assessment
  public addAssessment(
    assessment: Assessment
  ): Observable<HttpResponse<Assessment>> {
    return this.http.post<Assessment>(`${this.host}/assessment`, assessment, {
      observe: 'response',
    });
  }

  //eval assessment
  public evalAssessment(
    questions: Question[],
    assessmentIdentifier: string
  ): Observable<HttpResponse<Question[]>> {
    return this.http.post<Question[]>(
      `${this.host}/assessment/eval-assessment/${assessmentIdentifier}`,
      questions,
      {
        observe: 'response',
      }
    );
  }

  // get all assessment
  public getAssessments(
    keyword: string,
    currentPage: number,
    pazeSize: number
  ): Observable<PageResponse<Assessment>> {
    return this.http.get<PageResponse<Assessment>>(
      `${this.host}/assessment?keyword=${keyword}&page=${currentPage}&size=${pazeSize}`
    );
  }

  // get single assessment
  public getAssessment(assessmentIdentifier: string): Observable<Assessment> {
    return this.http.get<Assessment>(
      `${this.host}/assessment/${assessmentIdentifier}`
    );
  }

  // update assessment
  public updateAssessment(assessment: Assessment): Observable<Assessment> {
    return this.http.put<Assessment>(`${this.host}/assessment`, assessment);
  }

  // delete assessment
  public deleteAssessment(
    assessmentIdentifier: string
  ): Observable<CustomHttpRespone> {
    return this.http.delete<CustomHttpRespone>(
      `${this.host}/assessment/${assessmentIdentifier}`
    );
  }
}
