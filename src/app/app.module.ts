import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionLogIn } from '@ng-icons/ionicons';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, AuthComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({ ionLogIn }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
