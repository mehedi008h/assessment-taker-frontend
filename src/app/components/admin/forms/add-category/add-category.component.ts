import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryFormGroup!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {}

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
    console.log(this.addCategoryFormGroup.value);
  }
}
