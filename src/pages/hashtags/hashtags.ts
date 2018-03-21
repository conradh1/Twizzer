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
  selectedHashtags = [];
  public twizPage = TwizPage;
  checkboxValue: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataProvider: DataProvider) {

              this.getHashTags();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HashTagsPage');
  }

  public getHashTags(){
    this.dataProvider.getHashTags().subscribe((data)=>{
          this.hashtags = data;
    });
  }


  public gotoTwizPage(hashtag, id){
    this.navCtrl.push(this.twizPage,{
      hashtag: hashtag,
      id: id
    });
  }

  public clickedHashTag(name, checked) {
      console.log('debug clicked'+name+' '+checked);
      this.selectedHashtags
      const index: number = this.selectedHashtags.indexOf(name);
      if(checked === true && index == -1) {
        this.selectedHashtags.push(name);
      }
      else {
        this.selectedHashtags.splice(index, 1);
      }
      console.log('debug 2: '+this.selectedHashtags);
  }
}
