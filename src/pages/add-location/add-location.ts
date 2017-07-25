import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-add-location',
  templateUrl: 'add-location.html',
})
export class AddLocationPage {

  items = ['Lawrence', 'Philadelphia', 'New York City'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  getPlaces(){

  }

  addPlace(){
    
  }

}
