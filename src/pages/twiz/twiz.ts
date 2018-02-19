import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';


/**
 * Generated class for the TwizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-twiz',
  templateUrl: 'twiz.html',
})
export class TwizPage {

  hashtag = [];
  public tweets: any;  // contains question object
  private tweet_id;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataProvider: DataProvider) {
  }
  getTweets(tweet_id){
    this.dataProvider.getTweets().subscribe((data)=>{
          // filter by current tweet
          //console.log("debug getTweets"+tweet_id);
          this.tweets = data.filter((tweet) => {
            if (tweet.id == tweet_id ) {
              // assign sources to array
              return true;
            }
          });
    },error=>{
      console.log(error);// Error getting the data
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TwizPage');
    this.hashtag = this.navParams.get('hashtag');
    this.tweet_id = this.navParams.get('tweet_id');

    this.getTweets(this.tweet_id);
  }

  gotoNextTweet() {    
    this.navCtrl.setRoot(this.navCtrl.getActive().component,{
      hashtag: this.hashtag,
      tweet_id: this.tweet_id+1
    });
  }



}
