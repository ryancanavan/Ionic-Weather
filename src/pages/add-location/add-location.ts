import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { DbProvider } from '../../providers/db/db'
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html',
})
export class AddLocationPage {

  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public db:DbProvider) {
  }

  getPlaces(event: any){
    let url: string = 'http://autocomplete.wunderground.com/' + 'aq?query=' + event.target.value;
    console.log(url);
    this.http.get(url).map(res => res.json())
    .subscribe(data => {
      this.items = data.RESULTS;
    },
    err => {
      console.log("Error getting list of places!");
    }
    ); 
  }

  addPlace(place){
    this.db.addPlace(place.lat + ',' + place.lon);
    this.navCtrl.pop();
  }

}
