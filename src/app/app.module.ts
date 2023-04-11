import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgIconsModule } from '@ng-icons/core';
import { ReactiveFormsModule } from '@angular/forms';
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
} from '@ng-icons/ionicons';
import { heroQueueList, heroUsers } from '@ng-icons/heroicons/outline';
import { AuthComponent } from './components/auth/auth.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { HomeComponent } from './components/admin/home/home.component';
import { HeaderComponent } from './components/admin/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
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
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
