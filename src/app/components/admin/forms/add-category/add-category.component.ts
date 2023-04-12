import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  public showLoading!: boolean;
  private subscriptions: Subscription[] = [];
  addCategoryFormGroup!: FormGroup;
  submitted: boolean = false;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // category form validation
    this.addCategoryFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addCategory() {
    this.submitted = true;
    if (this.addCategoryFormGroup.invalid) return;
    this.subscriptions.push(
      this.categoryService
        .addCategory(this.addCategoryFormGroup.value)
        .subscribe(
          (response: HttpResponse<Category>) => {
            this.showLoading = false;
            this.notification.notify('Create Category Successfully');
          },
          (errorResponse: HttpErrorResponse) => {
            this.showLoading = false;
            this.notification.notify(errorResponse.error.message);
          }
        )
    );
    console.log(this.addCategoryFormGroup.value);
  }
}
