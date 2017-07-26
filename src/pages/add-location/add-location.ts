import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html',
})
export class AddLocationPage {

  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  getPlaces(event: any){
    let url: string = 'http://autocomplete.wunderground.com/aq?query=' + event.target.value;
    console.log(url);
    this.http.get(url).map(res => res.json())
    .subscribe(data => {
      this.items = data.RESULTS;
      console.log(this.items);
    },
    err => {
      console.log("Error getting list of places!");
    }
    ); 
  }

  addPlace(){
    
  }

}
