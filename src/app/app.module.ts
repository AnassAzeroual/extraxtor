import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppComponent } from './app.component';
import { Sp01Component } from './shared/speeners/sp01/sp01.component';
import { GridListEmailsComponent } from './components/grid-list-emails/grid-list-emails.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { GetByUrlComponent } from './shared/get-by-url/get-by-url.component';
import { GetByTextComponent } from './shared/get-by-text/get-by-text.component';

@NgModule({
  declarations: [
    AppComponent,
    Sp01Component,
    GridListEmailsComponent,
    AccueilComponent,
    GetByUrlComponent,
    GetByTextComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
