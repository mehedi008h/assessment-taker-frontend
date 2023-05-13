import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AddCategoryComponent } from './components/admin/forms/add-category/add-category.component';
import { AddAssessmentComponent } from './components/admin/forms/add-assessment/add-assessment.component';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { AssessmentsComponent } from './components/admin/assessments/assessments.component';
import { AssessmentDetailsComponent } from './components/admin/assessment-details/assessment-details.component';
import { AddQuestionComponent } from './components/admin/forms/add-question/add-question.component';
import { UpdateQuestionComponent } from './components/admin/forms/update-question/update-question.component';
import { UpdateAssessmentComponent } from './components/admin/forms/update-assessment/update-assessment.component';
import { UpdateCategoryComponent } from './components/admin/forms/update-category/update-category.component';
import { UsersComponent } from './components/admin/users/users.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { HealthComponent } from './components/admin/health/health.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { HomeComponent } from './components/home/home.component';
import { UserAssessmentComponent } from './components/user/user-assessment/user-assessment.component';
import { UserAssessmentDetailsComponent } from './components/user/user-assessment-details/user-assessment-details.component';
import { StartAssessmentComponent } from './components/user/start-assessment/start-assessment.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'assessments',
    component: UserAssessmentComponent,
  },
  {
    path: 'assessments/:assessmentIdentifier',
    component: UserAssessmentDetailsComponent,
  },
  {
    path: 'assessments/start-assessment/:assessmentIdentifier',
    component: StartAssessmentComponent,
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      {
        path: 'home',
        component: DashboardComponent,
      },
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
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'leaderboard',
        component: LeaderBoardComponent,
      },
      {
        path: 'system-health',
        component: HealthComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
