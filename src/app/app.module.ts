import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgIconsModule } from '@ng-icons/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
} from '@ng-icons/ionicons';
import { heroQueueList, heroUsers } from '@ng-icons/heroicons/outline';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
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
