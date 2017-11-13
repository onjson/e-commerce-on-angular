import { ProductService } from './shared/product.service';
import { StoreModule } from './store/store.module';
import { TokenInteceptor } from './shared/token.interceptor';
import { NavigationModule } from './navigation/navigation.module';
import { AuthModule } from './auth/auth.module';
import { NavigationService } from './shared/navigation.service';
import { TopLineModule } from './top-line/top-line.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { RestDataService } from './shared/rest-data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TopLineModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    AngularFontAwesomeModule,
    NavigationModule,
    StoreModule
  ],
  providers: [
    RestDataService,
    NavigationService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInteceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
