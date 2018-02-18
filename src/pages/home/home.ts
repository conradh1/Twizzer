import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HashTagsPage } from '../hashtags/hashtags';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public hashtagsPage = HashTagsPage;

  constructor(public navCtrl: NavController) {

  }
  public gotoHashTagsPage(){
    this.navCtrl.push(this.hashtagsPage);
  }

}
