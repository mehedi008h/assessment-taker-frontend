import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CustomHttpRespone } from 'src/app/models/custom-http-response';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public categories!: Category[];
  private subscriptions: Subscription[] = [];
  errorMessage!: string;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  // get categories
  public getCategories(): void {
    this.subscriptions.push(
      this.categoryService.getCategories().subscribe(
        (response: Category[]) => {
          this.categories = response;
          console.log('Response Categorys:', this.categories);
        },
        (errorResponse: HttpErrorResponse) => {
          this.notification.notify(errorResponse.error.message);
        }
      )
    );
  }

  // delete category
  public onDeleteCategory(categoryIdentifier: string): void {
    this.subscriptions.push(
      this.categoryService.deleteCategory(categoryIdentifier).subscribe(
        (response: CustomHttpRespone) => {
          this.notification.notify(response.message);
          this.getCategories();
        },
        (error: HttpErrorResponse) => {
          this.notification.notify(error.error.message);
        }
      )
    );
  }
}
