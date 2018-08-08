import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { SettingComponent } from './components/setting/setting.component';
import { SettingService } from './services/setting.service';
import { MessageService } from './services/message.service';
import { ClickOutSideDirective } from './directives/click-out-side.directive';
import { HeaderComponent } from './components/header/header.component';
import { SurveillanceComponent } from './components/surveillance/surveillance.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    SettingComponent,
    ClickOutSideDirective,
    HeaderComponent,
    SurveillanceComponent,
  ],
  imports: [
    BrowserModule,
    PerfectScrollbarModule,
    routing
  ],
  providers: [
  SettingService,
  MessageService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
