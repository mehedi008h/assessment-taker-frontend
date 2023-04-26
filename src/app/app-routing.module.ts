import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/admin/home/home.component';
import { AddCategoryComponent } from './components/admin/forms/add-category/add-category.component';
import { AddAssessmentComponent } from './components/admin/forms/add-assessment/add-assessment.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { AssessmentsComponent } from './components/admin/assessments/assessments.component';
import { AssessmentDetailsComponent } from './components/admin/assessment-details/assessment-details.component';
import { AddQuestionComponent } from './components/admin/forms/add-question/add-question.component';
import { UpdateQuestionComponent } from './components/admin/forms/update-question/update-question.component';
import { UpdateAssessmentComponent } from './components/admin/forms/update-assessment/update-assessment.component';
import { UpdateCategoryComponent } from './components/admin/forms/update-category/update-category.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'admin',
    component: HomeComponent,
    children: [
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'add-assessment',
        component: AddAssessmentComponent,
      },
      {
        path: 'assessments',
        component: AssessmentsComponent,
      },
      {
        path: 'assessments/:assessmentIdentifier',
        component: AssessmentDetailsComponent,
      },
      {
        path: 'assessments/:assessmentIdentifier/add-question',
        component: AddQuestionComponent,
      },
      {
        path: 'assessments/update-question/:questionIdentifier',
        component: UpdateQuestionComponent,
      },
      {
        path: 'assessments/update-assessment/:assessmentIdentifier',
        component: UpdateAssessmentComponent,
      },
      {
        path: 'categories/update-category/:categoryIdentifier',
        component: UpdateCategoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
