import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgIconsModule } from '@ng-icons/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  ionLogIn,
  ionLeafOutline,
  ionEyeOutline,
  ionEyeOffOutline,
  ionAddCircleOutline,
  ionBarChartOutline,
  ionHeartHalfSharp,
  ionNotificationsSharp,
  ionChatbubblesSharp,
  ionDuplicateOutline,
  ionAppsOutline,
  ionTimerOutline,
  ionBowlingBallOutline,
  ionSearch,
  ionListOutline,
  ionGridOutline,
  ionMailOpenOutline,
  ionPhonePortraitOutline,
  ionAtSharp,
  ionCalendarNumberOutline,
  ionCalendarOutline,
} from '@ng-icons/ionicons';
import {
  heroQueueList,
  heroUsers,
  heroUserGroup,
  heroLightBulb,
  heroBuildingOffice2,
} from '@ng-icons/heroicons/outline';
import { AuthComponent } from './components/auth/auth.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { HomeComponent } from './components/admin/home/home.component';
import { HeaderComponent } from './components/admin/header/header.component';
import { AddCategoryComponent } from './components/admin/forms/add-category/add-category.component';
import { AddAssessmentComponent } from './components/admin/forms/add-assessment/add-assessment.component';
import { AddQuestionComponent } from './components/admin/forms/add-question/add-question.component';
import { AuthenticationService } from './services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from './services/notification.service';
import { CategoriesComponent } from './components/admin/categories/categories.component';
import { AssessmentsComponent } from './components/admin/assessments/assessments.component';
import { AssessmentDetailsComponent } from './components/admin/assessment-details/assessment-details.component';
import { QuestionViewComponent } from './components/admin/question-view/question-view.component';
import { UpdateQuestionComponent } from './components/admin/forms/update-question/update-question.component';
import { UpdateAssessmentComponent } from './components/admin/forms/update-assessment/update-assessment.component';
import { UpdateCategoryComponent } from './components/admin/forms/update-category/update-category.component';
import { UsersComponent } from './components/admin/users/users.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { HealthComponent } from './components/admin/health/health.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserViewComponent } from './components/admin/user-view/user-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    AddCategoryComponent,
    AddAssessmentComponent,
    AddQuestionComponent,
    CategoriesComponent,
    AssessmentsComponent,
    AssessmentDetailsComponent,
    QuestionViewComponent,
    UpdateQuestionComponent,
    UpdateAssessmentComponent,
    UpdateCategoryComponent,
    UsersComponent,
    LeaderBoardComponent,
    HealthComponent,
    DashboardComponent,
    UserViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    NgIconsModule.withIcons({
      ionLogIn,
      ionLeafOutline,
      ionEyeOutline,
      ionEyeOffOutline,
      heroQueueList,
      ionAddCircleOutline,
      heroUsers,
      ionBarChartOutline,
      ionHeartHalfSharp,
      ionNotificationsSharp,
      ionChatbubblesSharp,
      ionDuplicateOutline,
      ionAppsOutline,
      ionTimerOutline,
      ionBowlingBallOutline,
      heroUserGroup,
      ionSearch,
      ionListOutline,
      ionGridOutline,
      ionMailOpenOutline,
      ionPhonePortraitOutline,
      ionAtSharp,
      ionCalendarNumberOutline,
      ionCalendarOutline,
      heroLightBulb,
      heroBuildingOffice2,
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    AuthenticationService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
