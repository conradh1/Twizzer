import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwizPage } from './twiz';

@NgModule({
  declarations: [
    TwizPage,
  ],
  imports: [
    IonicPageModule.forChild(TwizPage),
  ],
})
export class TwizPageModule {}
