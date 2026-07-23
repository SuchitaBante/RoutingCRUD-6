import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './shared/components/product/product.component';
import { ProductdashboardComponent } from './shared/components/productdashboard/productdashboard.component';
import { ProductformComponent } from './shared/components/productform/productform.component';
import { GetConfirmComponent } from './shared/components/get-confirm/get-confirm.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from "@angular/material/button";
import { HomeComponent } from './shared/components/home/home.component';
import { HomebannerComponent } from './shared/components/homebanner/homebanner.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FairsComponent } from './shared/components/fairs/fairs.component';
import { FairsDashboardComponent } from './shared/components/fairs-dashboard/fairs-dashboard.component';
import { FairsDetailsComponent } from './shared/components/fairs-details/fairs-details.component';
import { FairsCardComponent } from './shared/components/fairs-card/fairs-card.component';
import { UserComponent } from './shared/components/user/user.component';
import { UserdashboardComponent } from './shared/components/userdashboard/userdashboard.component';
import { UserformComponent } from './shared/components/userform/userform.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductdashboardComponent,
    ProductformComponent,
    GetConfirmComponent,
    HomeComponent,
    HomebannerComponent,
    NavbarComponent,
    FairsComponent,
    FairsDashboardComponent,
    FairsDetailsComponent,
    FairsCardComponent,
    UserComponent,
    UserdashboardComponent,
    UserformComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
