import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HashTagsPage } from '../pages/hashtags/hashtags';
import { TwizPage } from '../pages/twiz/twiz';
import { SummaryPage } from '../pages/summary/summary';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HashTagsPage,
    TwizPage,
    SummaryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HashTagsPage,
    TwizPage,
    SummaryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
