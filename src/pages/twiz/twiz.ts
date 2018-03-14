import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { SummaryPage } from '../summary/summary';


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
  public votes = [];
  public tweets: any;  // contains question object
  private id;
  public summaryPage = SummaryPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataProvider: DataProvider) {
  }

  getTweets(){
    this.dataProvider.getTweets().subscribe((data)=>{
          this.tweets = data;
    });
  }
  getTweet(id){
    this.dataProvider.getTweets().subscribe((data)=>{
          // filter by current tweet
          //console.log("debug getTweets"+tweet_id);
          this.tweets = data.filter((tweet) => {
            if (tweet.id == id ) {
              // assign sources to array
              return true;
            }
          });
    },error=>{
      console.log(error);// Error getting the data
    });
  }
  /*getTweet(id){
    this.dataProvider.getTweet(id).subscribe((data)=>{
          this.tweets = data;
    });
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad TwizPage');
    this.hashtag = this.navParams.get('hashtag');
    this.id = this.navParams.get('id');
    this.votes = this.navParams.get('votes');
    this.getTweet(this.id);
    //this.getTweets(this.tweet_id);
  }

  gotoNextTweet(vote) {
    this.votes.push(vote);
    console.log(this.votes);

    this.id++;

    // After five questions, go to the next page
    if ( this.id < 6 ) {
      this.navCtrl.setRoot(this.navCtrl.getActive().component,{
        hashtag: this.hashtag,
        id: this.id,
        votes: this.votes
        });
    }
    else {
      this.navCtrl.push(this.summaryPage,{
        votes: this.votes
      });
    }
  }



}
