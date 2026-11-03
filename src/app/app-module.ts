import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductComponent } from './product-component/product-component';
import { ItemComponent } from './item-component/item-component';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home-component/home-component';
import { FooterComponent } from './footer-component/footer-component';
import { NavBarComponent } from './nav-bar-component/nav-bar-component';
import { ClientComponent } from './client-component/client-component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    ProductComponent,
    ItemComponent,
    HomeComponent,
    FooterComponent,
    NavBarComponent,
    ClientComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, NgbAlertModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
