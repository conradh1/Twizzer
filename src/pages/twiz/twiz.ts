import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Http } from '@angular/http';
import { SummaryPage } from '../summary/summary';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';


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
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  cards: Array<any>;
  stackConfig: StackConfig;
  hashtag = [];
  public vote_response = '';
  public votes = [];
  public tweets: any;  // contains question object
  private id;
  public summaryPage = SummaryPage;

  constructor(public http: Http,public navCtrl: NavController,
              public navParams: NavParams,
              private dataProvider: DataProvider) {

    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.cards = [{tweet: 'hello'}];
    this.addNewCards(1);
  }
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16*16 - abs, 16*16));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }
  // Connected through HTML
swipeTweet(like: boolean) {
  let tweet = this.cards.pop();
    this.votes.push(like);
  console.log('voteUp'+this.id+' votes'+this.votes);

  if ( this.id == 5 ) {
    this.navCtrl.push(this.summaryPage,{
      votes: this.votes
    });
  }
  else {
    this.id += 1;
    this.addNewCards(this.id);
  }
  if (like) {
    this.vote_response = 'You liked! ';
  } else {
    this.vote_response = 'You disliked! ';
  }

}

// Add new cards to our array
addNewCards(id: number) {
  this.cards.push(this.getTweet(id));
}

// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
decimalToHex(d, padding) {
  var hex = Number(d).toString(16);
  padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

  while (hex.length < padding) {
    hex = "0" + hex;
  }

  return hex;
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
              return tweet;
            }
          });
    },error=>{
      console.log(error);// Error getting the data
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TwizPage');
    this.hashtag = this.navParams.get('hashtag');
    this.id = this.navParams.get('id');
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
