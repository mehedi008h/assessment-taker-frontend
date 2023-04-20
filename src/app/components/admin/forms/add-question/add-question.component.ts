import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  addQuestionFormGroup!: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // assessment form validation
    this.addQuestionFormGroup = this.fb.group({
      content: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      option5: [''],
      mark: ['', Validators.required],
      questionAnswer: ['', Validators.required],
    });
  }

  addQuestion() {
    this.submitted = true;
    if (this.addQuestionFormGroup.invalid) return;
    console.log(this.addQuestionFormGroup.value);
  }
}
