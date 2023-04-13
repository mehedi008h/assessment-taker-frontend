import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
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
  public refreshing!: boolean;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCategories(true);
  }

  public getCategories(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.categoryService.getCategories().subscribe(
        (response: Category[]) => {
          this.categories = response;
          console.log('Response Categorys:', this.categories);
          this.refreshing = false;
          if (showNotification) {
            this.notification.notify(
              `${response.length} Category(s) loaded successfully.`
            );
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.notification.notify(errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );
  }
}
