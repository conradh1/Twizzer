import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { TwizPage } from '../twiz/twiz';
/**
 * Generated class for the HashtagsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hashtags',
  templateUrl: 'hashtags.html',
})
export class HashTagsPage {

  hashtags = [];
  public twizPage = TwizPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataProvider: DataProvider) {

              this.getHashTags();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HashTagsPage');
  }

  getHashTags(){
    this.dataProvider.getHashTags().subscribe((data)=>{
          this.hashtags = data;
    });
  }

  public gotoTwizPage(hashtag, id, votes){
    this.navCtrl.push(this.twizPage,{
      hashtag: hashtag,
      id: id,
      votes: votes
    });
  }

}
