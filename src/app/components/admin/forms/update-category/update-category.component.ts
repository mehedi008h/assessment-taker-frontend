import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  categoryIdentifier!: string;
  updateCategoryFormGroup!: FormGroup;
  submitted: boolean = false;
  public category!: Category;
  private subscriptions: Subscription[] = [];
  public refreshing!: boolean;
  public showLoading!: boolean;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // get identifier from route
    this.categoryIdentifier = this.route.snapshot.params['categoryIdentifier'];

    this.getCategory();
  }

  // get question
  public getCategory(): void {
    this.subscriptions.push(
      this.categoryService.getCategory(this.categoryIdentifier).subscribe(
        (response: Category) => {
          this.category = response;
          // question form validation
          this.updateCategoryFormGroup = this.fb.group({
            title: [this.category.title, Validators.required],
            description: [this.category.description, Validators.required],
          });
        },
        (errorResponse: HttpErrorResponse) => {
          this.errorMessage = errorResponse.error.message;
          this.notification.notify(errorResponse.error.message);
        }
      )
    );
  }

  // update category
  updateCategory() {
    this.submitted = true;
    if (this.updateCategoryFormGroup.invalid) return;
    this.subscriptions.push(
      this.categoryService
        .updateCategory({
          ...this.updateCategoryFormGroup.value,
          categoryIdentifier: this.category.categoryIdentifier,
          id: this.category.id,
        })
        .subscribe(
          (response: Category) => {
            this.showLoading = false;
            this.notification.notify('Category Updated Successfully');
          },
          (errorResponse: HttpErrorResponse) => {
            this.showLoading = false;
            this.errorMessage = errorResponse.error.message;
            this.notification.notify(errorResponse.error.message);
          }
        )
    );
  }
}
