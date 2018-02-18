import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HashTagsPage } from './hashtags';

@NgModule({
  declarations: [
    HashTagsPage,
  ],
  imports: [
    IonicPageModule.forChild(HashTagsPage),
  ],
})
export class HashTagsPageModule {}
