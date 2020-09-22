import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

import { AppComponent } from './app.component';
import {BsModalService} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ToastrModule } from 'ng6-toastr-notifications';
// export class CustomOption extends ToastOptions {
//     animate = 'flyRight'; // you can override any options available
//     newestOnTop = false;
//     showCloseButton = true;
//     positionClass = 'toast-bottom-right';
// }
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
      BrowserAnimationsModule,
      ToastrModule.forRoot()
  ],
  providers: [BsModalService,
      ],
  bootstrap: [AppComponent]
})
export class AppModule {}
