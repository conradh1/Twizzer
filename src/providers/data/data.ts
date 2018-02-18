import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  public data: any;

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

  getHashTags() {
    return  this.http.get('data/hashtags.json').map(res => res.json());
  }

  getTweets() {
    return  this.http.get('data/tweets.json').map(res => res.json());
  }
}
